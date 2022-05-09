//@ts-nocheck
import { useEffect, useRef, useState } from 'react'
import {
  Dropzone,
  Modal,
  Button,
  //@ts-ignore
} from 'vtex.styleguide'
import useDisclosure from 'vtex.styleguide/useDisclosure'
import { ICollection } from '../../../context/useCollections';
import { TableType } from '../Table';

async function sendData(id: string | number,files: FileList) {
  var request = new XMLHttpRequest();
  request.open('POST', `/_v/collections/import/${id}`, true);
  request.onload = function() {
    console.log(request.responseText);
  };

  request.onerror = function() {
    // request failed
  };

  var formData = new FormData();

  formData.append("multipleFiles", files[0]);

  request.send(formData);
}

export const useModalImport = ()=>{
  const [collection, setCollection] = useState<TableType>()
  const [files, setFiles] = useState<FileList>()

  const clear = ()=> setCollection(undefined);

  return {
    clear,
    setCollection,
    Modal: (
      <Modal
        isOpen={!!collection}
        onClose={clear}
        size="auto"
        title={`Importar plantilla de productos a "${collection?.name}"`}
        aria-describedby="modal-description"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={clear}>
                Cancelar
              </Button>
            </span>
            <span>
              <Button variation="primary" disabled={!files} onClick={()=> {
                sendData(collection.id, files);
                clear();
              }}>
                Importar
              </Button>
            </span>
          </div>
        }
      >
        <div className='mb5'>
          <p className="f5 c-muted-1 mt3 mb7">
            <ul>
              <li className="mb3">Por favor, utilice nuestro modelo como base.</li>
              <li className="mb3">Cuando utilice el formato CSV, asegúrese de que los campos estén separados por comas.</li>
              <li className="mb3">Para cada producto, puede optar por completar el campo ID o SKU ID. En ambos casos se considerará el producto con todos sus SKU.</li>
            </ul>
          </p>
          <div className="mb3">
            <Button variation="secondary" onClick={clear}>
              Descargar el modelo
            </Button>
          </div>
          <Dropzone
            onDropAccepted={(files)=> setFiles(files)}
            onFileReset={()=> setFiles(undefined)}>
            <div className="pt7">
              <div>
                <span className="f4">Drop here your XLS or </span>
                <span className="f4 c-link" style={{ cursor: 'pointer' }}>
                  choose a file
                </span>
              </div>
            </div>
          </Dropzone>
        </div>
      </Modal>
    )
  }
}

