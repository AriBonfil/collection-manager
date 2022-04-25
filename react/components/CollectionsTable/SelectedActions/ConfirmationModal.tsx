import React, { useState} from 'react'

import { useCollectionManager } from '../../../context'
import styled from 'styled-components'
//# ANY #
const ConfirmationModal:React.FC<{props: any}> = ({props}) => {
  const {
    selectedItems,
    editMode
  } = useCollectionManager();
  const [loading] = useState(false)
  const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 16px;
    border: 1px solid black;
    padding: 1rem;
  `
  return (
    <>
     {
    props.action && !loading && editMode &&
    <ModalContainer>
      <p>Estas segurx de la accion que queres realizar?</p>
      <p>La accion {props.action} se ejecutara sobre los siguientes IDs:</p>
      <ul>
      {selectedItems.map(i => (<li key={i}>{i}</li>))}
      </ul>
      <button onClick={() => props.handleModalCallback(true)}>Si, estoy segurx</button>
      <button onClick={() => props.handleModalCallback(false)}>Cancelar</button>
      </ModalContainer>
    }
      {loading && <ModalContainer>Cargando</ModalContainer>}
    </>
  )
}

export default ConfirmationModal
