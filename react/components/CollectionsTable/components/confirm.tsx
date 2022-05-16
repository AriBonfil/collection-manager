//@ts-nocheck
import { useEffect, useRef, useState } from 'react'
import {
  Dropzone,
  Modal,
  Button,
  //@ts-ignore
} from 'vtex.styleguide'
import { ModalDialog } from 'vtex.styleguide'
import useDisclosure from 'vtex.styleguide/useDisclosure'
import { ICollection } from '../../../context/useCollections';
import { TableType } from '../Table';
import { downloadBase64File } from '../utils/sampleFile';
import { Collapsible } from 'vtex.styleguide'


export const useModalConfirm = ()=>{
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<{
    run: ()=>Promise<boolean>,
    list: TableType[]
  }>()

  const [openCollap, setOpenCollap] = useState(false);

  const clear = ()=> setAction(undefined);
  const close = ()=> setOpen(false);


  const _ref = {
    action,
    setAction
  }
  const ref = useRef<typeof _ref>();
  ref.current = _ref;

  const isMulti = action?.list.length > 1;

  return {
    clear,
    setAction: ((v: typeof action)=> {
      setAction(v)
      setOpen(true);
      setOpenCollap(false);
    }),
    Modal: (
      <ModalDialog
        centered
        // loading={loading}
        confirmation={{
          onClick: async ()=>{
            if(ref.current && await ref.current.action?.run()) close()
          },
          label: `Borrar ${isMulti?`las colecciones`:`la coleccion`} `,
          isDangerous: true,
        }}
        cancelation={{
          onClick: close,
          label: 'Cancelar',
        }}
        isOpen={open}
        onClose={close}>
        <div className="">
          <p className="f3 f3-ns fw3 gray">
            Seguro que quieres eliminar {isMulti?`estas colecciones`:`esta coleccion`}
          </p>
          <p>
            Esta acción es irreversible.
            {isMulti && <><br/>Se eliminará todas las colecciones seleccionadas.</>}
          </p>
          <div className="mt5">

              {!isMulti ? <>
                {action?.list.map(l=>(<li className="mt3"><span className='b'>({l.id})</span> {l.name}</li>))}
              </>:
                <Collapsible
                  header={<span>Colecciones ({action?.list.length})</span>}
                  onClick={e => setOpenCollap(!openCollap)}
                  isOpen={openCollap}
                  caretColor="muted">
                    <ul className="mid-gray">
                      {action?.list.map(l=>(<li className="mt3"><span className='b'>({l.id})</span> {l.name}</li>))}
                    </ul>
                </Collapsible>
              }

          </div>
        </div>
      </ModalDialog>
    )
  }
}

