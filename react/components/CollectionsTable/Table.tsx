import React from 'react'
import { useCollectionManager } from '../../context'
import './Table.css'

import {
  EXPERIMENTAL_Table,
  EXPERIMENTAL_useTableMeasures,
  EXPERIMENTAL_useCheckboxTree,
  //@ts-ignore
  Checkbox, Tooltip, IconInfo, ActionMenu
} from 'vtex.styleguide'

import { ICollection } from './SelectedActions/actions/useCollections'
import useCloneCollections from './SelectedActions/actions/useCloneCollections'
import useDeleteCollections from './SelectedActions/actions/useDeleteCollections'
import { useTasks } from './Tasks'
import { columns } from './Columns'
import { StatusFilter } from './components/status'

export type TableType = {
  id: number,
  name: string,
  products: {
    total: number,
    type: "Automatic" | "Manual"
  },
  active: boolean
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
function useColumnsWithCheckboxes({ items }:{items:TableType[]}) {
  const checkboxes = EXPERIMENTAL_useCheckboxTree({
    items,
    onToggle: ({ checkedItems }:any) => console.table(checkedItems),
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

  const withCheckboxes = [
    {
      id: 'checkbox',
      title: (
        <StopEvent>
          <Checkbox
            id={`${checkboxes.itemTree.id}`}
            checked={checkboxes.allChecked}
            partial={checkboxes.someChecked}
            onChange={checkboxes.toggleAll}
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
  return [withCheckboxes, (data:TableType) => checkboxes.isChecked(data), checkboxes]
}

const Table = () => {
  const {
    collections: {
      items = [],
      error: errorCollection,
      pagination,
      isLoading,
      forceUpdate,
      queryParams,
      sorting,
      setQueryParams
    }
  } = useCollectionManager();

  const { ModalTasks, BotonTasks } = useTasks();

  const sliceItems:TableType[] = isLoading || !pagination?[]:items.map((c:ICollection)=>({
    checkbox: false,
    id: c.id,
    name: c.name,
    active: c.active,
    products: {
      total: c.totalProducts,
      type: c.type
    },
  }))

  const measures = EXPERIMENTAL_useTableMeasures({ size: queryParams.pageSize})

  const [withCheckboxes,, checkboxes] = useColumnsWithCheckboxes({
    items: sliceItems,
  })

  const GoToDetalles = (id:number)=>{
    location.href = `collection-manager/detail/${id}`
  }

  return (
    <>
      {ModalTasks}
      <EXPERIMENTAL_Table
        loading={isLoading || errorCollection}
        onRowClick={({ rowData }:{rowData: TableType}) =>{
          if(Date.now() - omitClick1 < 100 ) return;
          GoToDetalles(rowData.id);
        }}
        sorting={sorting}
        items={sliceItems}
        columns={withCheckboxes}
        measures={measures}>
          <EXPERIMENTAL_Table.Toolbar>
            <EXPERIMENTAL_Table.Toolbar.InputSearch {...{
              value: queryParams.q,
              placeholder: 'Buscar...',
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
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Upload {...{
                label: 'Import',
                onClick: () => alert('Clicked IMPORT'),
              }} />
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
              <StatusFilter/>
            </div>
          </EXPERIMENTAL_Table.Toolbar>
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
          }}/>
          <EXPERIMENTAL_Table.Bulk active={(checkboxes as any).someChecked}>
            <EXPERIMENTAL_Table.Bulk.Actions>
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Eliminar',
                onClick: () => {
                  useDeleteCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.map(i=> i.id));
                },
              }} />
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Clonar',
                onClick: () => {
                  useCloneCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.map(i=> i.id));
                },
              }} />
              {/* <EXPERIMENTAL_Table.Bulk.Actions.Secondary {...{
                label: 'Quantity',
                actions: [
                  {
                    label: 'Increase 50',
                    onClick: () => alert("A"),
                  },
                  {
                    label: 'Decrease 50',
                    onClick: () => alert("A"),
                    isDangerous: true
                  },
                ],
                onActionClick: (action:any) => action.onClick((checkboxes as any).checkedItems),
              }} /> */}
            </EXPERIMENTAL_Table.Bulk.Actions>
            <EXPERIMENTAL_Table.Bulk.Tail>
              {!(checkboxes as any).allChecked && (
                <EXPERIMENTAL_Table.Bulk.Tail.Info>
                  Colecciones seleccionadas: {(checkboxes as any).checkedItems.length}
                </EXPERIMENTAL_Table.Bulk.Tail.Info>
              )}
              <EXPERIMENTAL_Table.Bulk.Tail.Toggle
                button={{
                  text: `Seleccionar todas ${items.length}`,
                  onClick: (checkboxes as any).checkAll,
                }}
                active={(checkboxes as any).allChecked}>
                Colecciones seleccionadas: {items.length}
              </EXPERIMENTAL_Table.Bulk.Tail.Toggle>
              <EXPERIMENTAL_Table.Bulk.Tail.Dismiss onClick={(checkboxes as any).uncheckAll} />
            </EXPERIMENTAL_Table.Bulk.Tail>
          </EXPERIMENTAL_Table.Bulk>
      </EXPERIMENTAL_Table>
    </>
  )
}

export default Table
