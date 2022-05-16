import React, { useEffect } from 'react'
import { useCollectionManager } from '../../context'
import './styles/styles.css'

import {
  EXPERIMENTAL_Table,
  EXPERIMENTAL_useTableMeasures,
  EXPERIMENTAL_useCheckboxTree,
  //@ts-ignore
  Checkbox, Tooltip, IconInfo, ActionMenu, Alert, Button
} from 'vtex.styleguide'

import { ICollection } from '../../context/useCollections'
import {BlockPushManyCollections, BlockDeleteManyCollections, CloneManyCollections, DeleteManyCollections} from './utils/TasksCollections'
import { useTasks } from './components/Tasks'
import { columns } from './components/Columns'
import { StatusFilter } from './components/StatusFilter'
import { AutoDelete } from './components/AutoDelete'

export type TableType = {
  id: number,
  name: string,
  total: number,
  type: "Automatic" | "Manual",
  active: boolean,
  persistent: boolean
}


let omitClick1:number = 0;
export const StopEvent:React.FC = ({children})=>{
  return <div onClick={()=>{
    omitClick1 = Date.now();
  }} style={{
    "width": "32px",
    "height": "32px",
    "justifyContent": "center",
    "alignItems": "center",
    "display": "flex",
  }}>
    {children}
  </div>
}

//hook to handle checkboxes
function useColumnsWithCheckboxes({ items, itemsAll }:{items:TableType[], itemsAll:TableType[]}) {
  const checkboxes = EXPERIMENTAL_useCheckboxTree({
    items: itemsAll,
    // onToggle: ({ checkedItems }:any) => console.table(checkedItems),
  })

  const mapped:any = {};
  (checkboxes.itemTree.children as TableType[]).forEach((item:TableType ) => {
    const id = `${item.id}`
    mapped[id] = (
      <StopEvent>
        <Checkbox
          key={id}
          id={id}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          disabled={checkboxes.isDisabled(item)}
          onChange={() => checkboxes.toggle(item)}
        />
      </StopEvent>
    )
  })

  const isCheck = items.length > 0? items.every(i=> checkboxes.isChecked(i)): false;
  const withCheckboxes = [
    {
      id: 'checkbox',
      title: (
        <StopEvent>
          <Checkbox
            id={`${checkboxes.itemTree.id}`}
            checked={isCheck}
            partial={items.some(i=> checkboxes.isChecked(i))}
            onChange={()=> isCheck?items.forEach(i=> checkboxes.uncheck(i)):items.forEach(i=> checkboxes.check(i))}
          />
        </StopEvent>
      ),
      width: "32px",
      extended: true,
      cellRenderer: ({ data }: {data: TableType}) => <div>{mapped[data.id]}</div>,
    },
    ...columns,
  ]

  // [parsed columns, isRowActive function, checked items, allChecked]
  // return [withCheckboxes, (data:TableType) => checkboxes.isChecked(data), checkboxes]
  return {
    withCheckboxes,
    checkboxes
  }
}

export const GoToDetalles = (id:number)=>{
  location.href = `//${location.host}/admin/app/collection-manager/detail/${id}`
}

export const GoToMain = ()=>{
  location.href = `//${location.host}/admin/app/collection-manager/`
}

const customEmptyState = {
  label: 'This is a default empty state for title',
  children: (
    <React.Fragment>
      <p>
        A longer explanation of what should be here, and why should I care
        about what should be here.
      </p>
      <div className="pt5">
        <Button variation="secondary" size="small">
          <span className="flex align-baseline">Suggested action</span>
        </Button>
      </div>
    </React.Fragment>
  ),
}

export const Table = () => {
  const {
    collections: {
      items = [],
      itemsAll = [],
      errorCollection,
      pagination,
      isLoading,
      forceUpdate,
      renderUpdate,
      queryParams,
      sorting,
      setQueryParams
    },
    modalImport,
    modalConfirm
  } = useCollectionManager();

  const { ModalTasks, BotonTasks } = useTasks();

  const sliceItems:TableType[] = isLoading || !pagination?[]:items.map((c:ICollection)=>({
    checkbox: false,
    id: c.id,
    name: c.name,
    active: c.active,
    total: c.totalProducts,
    type: c.type,
    persistent: c.persistent
  }))

  const measures = EXPERIMENTAL_useTableMeasures({ size: isLoading? 10 : queryParams.pageSize  })

  const {withCheckboxes, checkboxes} = useColumnsWithCheckboxes({
    items: sliceItems,
    itemsAll: itemsAll.map((c:ICollection)=>({
      checkbox: false,
      id: c.id,
      name: c.name,
      active: c.active,
      total: c.totalProducts,
      type: c.type,
      persistent: c.persistent
    })),
  })

  useEffect(checkboxes.uncheckAll,[queryParams.q, queryParams.status]);

  const isLoadingState = isLoading || errorCollection;

  const isCheck = checkboxes.checkedItems.length > 0? checkboxes.checkedItems.every((i:any)=> i.persistent): false;

  return  (
    <>
      {ModalTasks}
      {modalConfirm.Modal}
      {modalImport.Modal}
      <div className="mb5">
        <AutoDelete/>
      </div>
      <EXPERIMENTAL_Table
        loading={isLoadingState}
        onRowClick={({ rowData }:{rowData: TableType}) =>{
          if(Date.now() - omitClick1 < 100 ) return;
          if(checkboxes.checkedItems.length === 0) GoToDetalles(rowData.id);
        }}
        sorting={sorting}
        emptyState={customEmptyState}
        items={sliceItems}
        columns={withCheckboxes}
        measures={measures}>
          <EXPERIMENTAL_Table.Toolbar>
            <EXPERIMENTAL_Table.Toolbar.InputSearch {...{
              value: queryParams.q,
              placeholder: 'Buscar...',
              disabled: isLoading,
              onChange: (e:any) => setQueryParams({q: e.currentTarget.value, page: 0 }),
              onClear: () => {
                setQueryParams({q: null, page: 0})
              },
              onSubmit: (e:any) => {
                e.preventDefault()
                setQueryParams({q: null, page: 0})
              },
            }} />
            <EXPERIMENTAL_Table.Toolbar.ButtonGroup>
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Columns {...buttonColumns} /> */}
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Density {...{
                label: 'Line density',
                compactLabel: 'Compact',
                regularLabel: 'Regular',
                comfortableLabel: 'Comfortable',

              }} />
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Download {...download} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Upload {...{
                label: 'Import',
                onClick: () => alert('Clicked IMPORT'),
              }} /> */}
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.ExtraActions {...{
                label: 'Mas opciones',
                actions: [
                  {
                    label: 'Actualizar',
                    onClick: () => forceUpdate(),
                  },
                ],
              }} />
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.NewLine {...newLiane} /> */}
            </EXPERIMENTAL_Table.Toolbar.ButtonGroup>
            <div className='flex flex-grow-1 justify-end items-center'>
              <span className='mr5'>
                {BotonTasks}
              </span>
              {!isLoading && <StatusFilter/>}
            </div>
          </EXPERIMENTAL_Table.Toolbar>
          {!isLoadingState &&
            <EXPERIMENTAL_Table.Pagination {...{
              onPrevClick: ()=> setQueryParams({page: queryParams.page - 1}),
              onNextClick: ()=> setQueryParams({page: queryParams.page + 1}),
              onRowsChange: (_:any, value:string)=> setQueryParams({pageSize: parseInt(value), page: 0}),
              tableSize: queryParams.pageSize,
              currentPage: queryParams.page,
              currentItemFrom: queryParams.pageSize * queryParams.page,
              currentItemTo: queryParams.pageSize * (queryParams.page + 1),
              textOf: 'de',
              rowsOptions: [10, 15,25,50],
              textShowRows: 'Colecciones mostradas',
              totalItems:  pagination?.total,
              selectedOption: queryParams.pageSize
            }}/>
          }
          <EXPERIMENTAL_Table.Bulk active={(checkboxes as any).someChecked}>
            <EXPERIMENTAL_Table.Bulk.Actions>
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Eliminar',
                onClick: () => {
                  modalConfirm.setAction({
                    run: async ()=>{
                      DeleteManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id));
                      checkboxes.uncheckAll();
                      return true
                    },
                    list: checkboxes.checkedItems as any
                  });
                },
              }} />
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Clonar',
                onClick: () => {
                  CloneManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id));
                  checkboxes.uncheckAll();
                },
              }} />
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: isCheck?'Desbloquear':'Bloquear',
                onClick: () => {
                  if(isCheck){
                    BlockDeleteManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id)).then(ids=>{
                      ids.forEach((id)=>{
                        const item = itemsAll.find(i=> i.id === id);
                        if(!item) return;
                        item.persistent = false;
                      });
                      renderUpdate();
                    })
                  }
                  else{
                    BlockPushManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id)).then(ids=>{
                      ids.forEach((id)=>{
                        const item = itemsAll.find(i=> i.id === id);
                        if(!item) return;
                        item.persistent = true;
                      });
                      renderUpdate();
                    })
                  }
                  checkboxes.uncheckAll();
                },
              }} />
            </EXPERIMENTAL_Table.Bulk.Actions>
            <EXPERIMENTAL_Table.Bulk.Tail>
              {!(checkboxes as any).allChecked && (
                <EXPERIMENTAL_Table.Bulk.Tail.Info>
                  {checkboxes.checkedItems.length} Colecciones
                </EXPERIMENTAL_Table.Bulk.Tail.Info>
              )}
              {/* <EXPERIMENTAL_Table.Bulk.Tail.Toggle
                button={{
                  text: `Pagina ${sliceItems.length}`,
                  onClick: ()=> checkboxes.setChecked(sliceItems),
                }}
                active={sliceItems.every(i=> checkboxes.isChecked(i))}>
              </EXPERIMENTAL_Table.Bulk.Tail.Toggle> */}
              {/* <EXPERIMENTAL_Table.Bulk.Tail.Toggle
                button={{
                  text: `Todas ${itemsAll.length}`,
                  onClick: (checkboxes as any).checkAll,
                }}
                active={(checkboxes as any).allChecked}>
                Colecciones seleccionadas: {checkboxes.checkedItems.length}
              </EXPERIMENTAL_Table.Bulk.Tail.Toggle> */}
              <EXPERIMENTAL_Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
            </EXPERIMENTAL_Table.Bulk.Tail>
          </EXPERIMENTAL_Table.Bulk>
      </EXPERIMENTAL_Table>
    </>
  )
}
