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
//@ts-ignore
// import OptionsDots from 'vtex.styleguide/OptionsDots';

import { ICollection } from './SelectedActions/actions/useCollections'
import { Tasks } from './tasks'

export type TableType = {
  id: number,
  name: string,
  products: {
    total: number,
    type: "Automatic" | "Manual"
  },
  active: boolean
}

const columns = [
  {
    id: 'name',
    title: 'Nombre de la colección',
    width: '60.8108%',
  },
  {
    id: 'products',
    title: <div className="tr ws-normal">Productos</div>,
    width: '10.1351%',
    minWidth: '10.1351%',
    cellRenderer: ({ data:{total, type} }:{data: TableType["products"]}) => <div className="tr">{type==="Manual"?total:
    <div className="flex relative items-center justify-end">
      n/a <Tooltip label="La cantidad de productos no se aplica ya que se agregaron automáticamente al CMS.">
        <span className="c-on-base pointer ml2 mt2">
          <IconInfo size={14}/>
        </span>
      </Tooltip>
    </div>
  }</div>,
  },
  {
    id: 'id',
    title: <div className="tr ws-normal">ID</div>,
    width: '10.1351%',
    cellRenderer: ({ data }:{data: boolean}) => <div className="tr">{data}</div>,
  },
  {
    id: 'active',
    title: <div className="tr ws-normal">Estatus</div>,
    width: '12.1622%',
    cellRenderer: ({ data }:{data: boolean}) => <div className="flex flex-row justify-end pl2">
      {
        data?
        <div className="flex relative items-center" data-testid="collection-status-tag"><span className="pr3">Activa</span><div data-testid="collection-status-tag-style" style={{background:"rgb(139, 195, 74)", height: "10px", width: "10px", borderRadius: "100%"}}></div></div>
        :<div className="flex relative items-center" data-testid="collection-status-tag"><span className="pr3">Inactivo</span><div data-testid="collection-status-tag-style" style={{background:"#c6c6c6", height: "10px", width: "10px", borderRadius: "100%"}}></div></div>
      }
    </div>,
  },
  {
    id: 'actions',
    width: '3rem',
    cellRenderer: (props:any) => <Actions {...props} />,
    /** This column is extended, its data is the entire row */
    extended: true,
  },
]

function Actions({ data }:any) {
  return (
    <StopEvent>
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <IconInfo />,
        }}
        options={[
          {
            label: 'Detalles',
            onClick: () =>
              alert(
                `Executed action for ${data.name} of price ${data.retailPrice}`
              ),
          },
          {
            label: 'Clonar',
            onClick: () =>
              alert(
                `Executed action for ${data.name} of price ${data.retailPrice}`
              ),
          },
          {
            label: 'Eliminar',
            isDangerous: true,
            onClick: () =>
              alert(
                `Executed a DANGEROUS action for ${data.name} of price ${data.retailPrice}`
              ),
          },
        ]}
      />
    </StopEvent>
  )
}
let omitClick1:number = 0;
const StopEvent:React.FC = ({children})=>{
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
      pagination,
      isLoading,
      queryParams,
      setQueryParams
    }
  } = useCollectionManager();

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

  const upload = {
    label: 'Import',
    onClick: () => alert('Clicked IMPORT'),
  }

  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
  }


  const extraActions = {
    label: 'More options',
    actions: [
      {
        label: 'An action',
        onClick: () => alert('An action'),
      },
      {
        label: 'Another action',
        onClick: () => alert('Another action'),
      },
      {
        label: 'A third action',
        onClick: () => alert('A third action'),
      },
    ],
  }

  return (
    <>
      <Tasks/>
      <EXPERIMENTAL_Table
        loading={isLoading}
        onRowClick={({ rowData }:{rowData: TableType}) =>{
          if(Date.now() - omitClick1 < 100 ) return;
          GoToDetalles(rowData.id);
        }}
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
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Density {...density} />
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Download {...download} /> */}
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Upload {...upload} />
              <EXPERIMENTAL_Table.Toolbar.ButtonGroup.ExtraActions {...extraActions} />
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.NewLine {...newLine} /> */}
            </EXPERIMENTAL_Table.Toolbar.ButtonGroup>
            <div>AAA</div>
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
                onClick: () => alert("A"),
              }} />
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Clonar',
                onClick: () => alert("A"),
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
