import React from "react";
import { GoToDetalles, StopEvent, TableType } from "../Table";
import { LockIcon, OptionsDots } from '../../../resources/icons'

import {
  //@ts-ignore
  Checkbox, Tooltip, IconInfo, ActionMenu
} from 'vtex.styleguide'
import DeleteCollections from "../utils/DeleteCollections";
import {CloneManyCollections} from "../utils/TasksCollections";
import { useCollectionManager } from "../../../context";


export const columns = [
  {
    id: 'name',
    sortable: true,
    title: 'Nombre de la colección',
    width: '60.8108%',
    extended: true,
    cellRenderer: ({ data }:{data: TableType}) => {
      return <div className="flex" style={data.active?{}:{color: "#979899"}}>{data.persistent && (
        <Tooltip label="Las colecciones bloqueadas no se eliminan luego de los 35 días de inactividad.">
          <span className="pointer">
            <LockIcon className="mr3" size={18}/>
          </span>
        </Tooltip>
      )}{data.name}</div>
    },
  },
  {
    id: 'products',
    sortable: true,
    title: <span className="tr ws-normal">Productos</span>,
    width: '12.1351%',
    minWidth: '12.1351%',
    extended: true,
    cellRenderer: ({ data }:{data: TableType}) => <div className="tr" style={data.active?{}:{color: "#979899"}}>{data.type==="Manual"?data.total:
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
    title: <span className="tr ws-normal">ID</span>,
    width: '10.1351%',
    extended: true,
    cellRenderer: ({ data }:{data: TableType}) => {
      return <div className="tr" style={data.active?{}:{color: "#979899"}}>{data.id}</div>
    },
  },
  {
    id: 'active',
    sortable: true,
    title: <span className="tr ws-normal">Estatus</span>,
    width: '12.1622%',
    extended: true,
    cellRenderer: ({ data }:{data: TableType}) => <div className="flex flex-row justify-end pl2">
      {
        data.active?
        <div className="flex relative items-center" data-testid="collection-status-tag"><span className="pr3" style={data.active?{}:{color: "#979899"}}>Activa</span><div data-testid="collection-status-tag-style" style={{background:"rgb(139, 195, 74)", height: "10px", width: "10px", borderRadius: "100%"}}></div></div>
        :<div className="flex relative items-center" data-testid="collection-status-tag"><span className="pr3" style={data.active?{}:{color: "#979899"}}>Inactivo</span><div data-testid="collection-status-tag-style" style={{background:"rgb(196, 196, 196)", height: "10px", width: "10px", borderRadius: "100%"}}></div></div>
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
  const { modalImport, modalConfirm } = useCollectionManager();

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
            label: 'Importar',
            onClick: () => {
              modalImport.setCollection(data)
            }
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

              modalConfirm.setAction({
                run: async ()=>{
                  await DeleteCollections([data.id])
                  return true
                },
                list: [data]
              });
            }
          },
        ]}
      />
    </StopEvent>
  )
}
