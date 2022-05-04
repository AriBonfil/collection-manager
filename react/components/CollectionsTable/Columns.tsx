import React from "react";
import { GoToDetalles, StopEvent, TableType } from "./Table";
import { OptionsDots } from '../../resources/icons'

import {
  //@ts-ignore
  Checkbox, Tooltip, IconInfo, ActionMenu
} from 'vtex.styleguide'
import useDeleteCollections from "./SelectedActions/actions/useDeleteCollections";
import {CloneManyCollections} from "./SelectedActions/actions/tasksCollections";


export const columns = [
  {
    id: 'name',
    sortable: true,
    title: 'Nombre de la colección',
    width: '60.8108%',
  },
  {
    id: 'products',
    sortable: true,
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
    sortable: true,
    title: <div className="tr ws-normal">ID</div>,
    width: '10.1351%',
    cellRenderer: ({ data }:{data: boolean}) => <div className="tr">{data}</div>,
  },
  {
    id: 'active',
    sortable: true,
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

function Actions({ data }:{data: TableType}) {
  return (
    <StopEvent>
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <OptionsDots />,
        }}
        options={[
          {
            label: 'Detalles',
            onClick: () => GoToDetalles(data.id)
          },
          {
            label: 'Clonar',
            onClick: async () =>{
              await CloneManyCollections([data.id]);
            }
          },
          {
            label: 'Eliminar',
            isDangerous: true,
            onClick: async () =>{
              await useDeleteCollections([data.id])
            }
          },
        ]}
      />
    </StopEvent>
  )
}
