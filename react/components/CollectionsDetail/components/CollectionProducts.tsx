import React from 'react'
import { useProductsByCollection } from '..';

import { useQueryParams, NumberParam,withDefault } from "use-query-params";

import {
  EXPERIMENTAL_Table,
  EXPERIMENTAL_useTableMeasures,
  //@ts-ignore
  Checkbox, Tooltip, IconInfo, ActionMenu
} from 'vtex.styleguide'


export const columns = [
  {
    id: 'imageUrl',
    title: <div className="tr ws-normal">Imagen</div>,
    width: '12.1622%',
    cellRenderer: ({ data }:{data: string}) =>
    <img title='Imagen de Producto' style={{width: '50px'}} src={data}></img>,
  },
  {
    id: 'name',
    title: 'Nombre',
    width: '60.8108%',
  },
  {
    id: 'id',
    sortable: true,
    title: <div className="tr ws-normal">ID</div>,
    width: '10.1351%',
    cellRenderer: ({ data }:{data: string}) => <div className="tc">{data}</div>,
  },
  {
    id: 'ref',
    sortable: true,
    title: <div className="tr ws-normal">RefID</div>,
    width: '10.1351%',
    cellRenderer: ({ data }:{data: string}) => <div className="tc">{data}</div>,
  },
]

const CollectionProducts:React.FC<{id: number | string}> = ({id}) => {

  const [, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 50),
  });

  const [data, loading] = useProductsByCollection(id, {
    page: 0,
    pageSize: 50
  });
  const {items = [], paging} = data || {};

  const measures = EXPERIMENTAL_useTableMeasures({ size: items.length +1})

  if(loading) return null;

  return (
    <div>

      <EXPERIMENTAL_Table
        loading={loading}
        // onRowClick={({ rowData }:{rowData: TableType}) =>{
        //   if(Date.now() - omitClick1 < 100 ) return;
        //   GoToDetalles(rowData.id);
        // }}
        items={items}
        columns={columns}
        measures={measures}>
          <EXPERIMENTAL_Table.Toolbar>
            {/* <EXPERIMENTAL_Table.Toolbar.InputSearch {...{
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
            }} /> */}
            {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Columns {...buttonColumns} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Density {...{
                label: 'Line density',
                compactLabel: 'Compact',
                regularLabel: 'Regular',
                comfortableLabel: 'Comfortable',
              }} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Download {...download} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.Upload {...{
                label: 'Import',
                onClick: () => alert('Clicked IMPORT'),
              }} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.ExtraActions {...{
                label: 'Mas opciones',
                actions: [
                  {
                    label: 'Actualizar',
                    onClick: () => forceUpdate(),
                  },
                ],
              }} /> */}
              {/* <EXPERIMENTAL_Table.Toolbar.ButtonGroup.NewLine {...newLiane} /> */}
            {/* </EXPERIMENTAL_Table.Toolbar.ButtonGroup> */}
            {/* <div className='flex flex-grow-1 justify-end items-center'>
              <span className='mr5'>
                {BotonTasks}
              </span>
              <StatusFilter/>
            </div> */}
          </EXPERIMENTAL_Table.Toolbar>
          <EXPERIMENTAL_Table.Pagination {...{
            onPrevClick: ()=> setQueryParams({page: paging.page - 1},"pushIn"),
            onNextClick: ()=> setQueryParams({page: paging.page + 1},"pushIn"),
            onRowsChange: (_:any, value:string)=> setQueryParams({pageSize: parseInt(value), page: 0}),
            tableSize: paging.perPage,
            currentPage: paging.page,
            currentItemFrom: paging.perPage * paging.page,
            currentItemTo: paging.perPage * (paging.page + 1),
            textOf: 'de',
            rowsOptions: [10, 15,25,50],
            textShowRows: 'Colecciones mostradas',
            totalItems:  paging.total,
          }}/>
          {/* <EXPERIMENTAL_Table.Bulk active={(checkboxes as any).someChecked}>
            <EXPERIMENTAL_Table.Bulk.Actions>
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Eliminar',
                onClick: () => {
                  DeleteManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id));
                },
              }} />
              <EXPERIMENTAL_Table.Bulk.Actions.Primary {...{
                label: 'Clonar',
                onClick: () => {
                  CloneManyCollections((checkboxes as {checkedItems: TableType[]}).checkedItems.filter(i=> Number.isInteger(i.id)).map(i=> i.id));
                },
              }} />
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
                Seleccionadas: {items.length}
              </EXPERIMENTAL_Table.Bulk.Tail.Toggle>
              <EXPERIMENTAL_Table.Bulk.Tail.Dismiss onClick={(checkboxes as any).uncheckAll} />
            </EXPERIMENTAL_Table.Bulk.Tail>
          </EXPERIMENTAL_Table.Bulk> */}
      </EXPERIMENTAL_Table>
    </div>
  )
}

export default CollectionProducts
