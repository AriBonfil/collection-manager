import React, {useContext, useState} from 'react'
import useDeleteCollections from './actions/useDeleteCollections'
import { CollectionManagerContext } from '../../../context'
import styled from 'styled-components'
const ConfirmationModal = ({action}) => {
  const {
    selectedItems,

  } = useContext(CollectionManagerContext)
  const [loading, setLoading] = useState(false)
  const ModalContainer = styled.div`
    position: fixed;
    left: 50%;
    bottom: 50%;
    background-color: white;
    border-radius: 16px;
    border: 1px solid black;
    padding: 1rem;
  `
  const handleConfirmation = async () => {
    setLoading(true)
    switch (action) {
      case 'delete':
          await useDeleteCollections(selectedItems)
          setLoading(false)
        break;
       /*  case 'clone':
          useCloneCollections(selectedItems)
        break; */
      default:
        break;
    }
  }
  return (
    <>


    {
    action && !loading &&
    <ModalContainer>
      <p>Estas segurx de la accion que queres realizar?</p>
      <p>La accion {action} se ejecutara sobre los siguientes IDs:</p>
      {selectedItems.map(i => (<p key={i}>{i}</p>))}
      <button onClick={() => handleConfirmation(action)}>Si, estoy segurx</button>
      </ModalContainer>
      }
      {loading && <ModalContainer>Cargando</ModalContainer>}
    </>
  )
}

export default ConfirmationModal
