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
import { downloadBase64File } from '../utils/sampleFile';

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
            <Button variation="secondary" onClick={()=>{
              downloadBase64File("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","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","templante.xls")
            }}>
              Descargar el modelo
            </Button>
          </div>
          <Dropzone
            accept=".xml, .xls"
            onDropAccepted={(files)=> setFiles(files)}
            onFileReset={()=> setFiles(undefined)}>
            <div className="pt7">
              <div>
                <span className="f4">Arrastre y suelte aquí su archivo CSV, XLS o </span>
                <span className="f4 c-link" style={{ cursor: 'pointer' }}>
                  elija un archivo
                </span>
              </div>
            </div>
          </Dropzone>
        </div>
      </Modal>
    )
  }
}

