import React, { useState, useContext, useEffect } from 'react'
import useDeleteCollections from './actions/useDeleteCollections'
import useCloneCollections from './actions/useCloneCollections'
import { CollectionManagerContext } from '../../../context'
import styled from 'styled-components'
import ConfirmationModal from './ConfirmationModal'

const SelectedActions = () => {
  const { selectedItems, editMode, refreshData } = useContext(CollectionManagerContext)
  const [showActions, setShowActions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState(null)
  const [error, setError] = useState(false)
  const FixedContent = styled.div`
    position: fixed;
    bottom: 5%;
    right: 5%;
    border: 1px solid lightgray;
    background-color: lightgoldenrodyellow;
    padding: 0.5rem;
    border-radius: 12px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  `
  const ActionsList = styled.ul`
    list-style: none;
    padding: 0;
  `
  const ListContainer = styled.div``

  const ListItem = styled.li`
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid black;
    &:hover {
      background-color: ${props => props.backgroundColor === 'danger' ? 'red' : 'white'}
    }
  `
  function handleItemClick (action) {
      setAction(action)
      setShowModal(true)
  }

  const handleModalCallback = async (userAccept) => {
    if(userAccept)
    {
         switch (action) {
          case 'delete':
              let res = await useDeleteCollections(selectedItems)
              if(res.success)
              {
                refreshData()
                setShowModal(false)
              }
              else {
                setShowModal(false)
                setError(true)
                alert("No se ha podido realizar la accion correctamente")
              }
            break;
          case 'clone':
            //Pending to implement in service side
             /*  useCloneCollections(selectedItems) */
            break;
          default:
            console.log("La accion no es valida", action);
            break;
        }
    }
    else {
      setShowModal(false)
    }
  }
  let modalProps = {
    action,
    handleModalCallback
  }
  return (
    <>
      {selectedItems.length > 0 && editMode && (
        <FixedContent onClick={() => setShowActions(!showActions)}>
          {showActions && (
            <ListContainer>
              <ActionsList>
                <ListItem onClick={() => handleItemClick('clone')}>Clonar seleccion</ListItem>
                <ListItem backgroundColor='danger' onClick={() => handleItemClick('delete')}>
                  Eliminar seleccion
                </ListItem>
              </ActionsList>
            </ListContainer>
          )}

          <p>Acciones</p>
        </FixedContent>

      )}
      {error ? <div>Tu ultima accion NO se a realizado correctamente</div> : <div>Tu ultima accion se a realizado correctamente</div>}
      {showModal && action && !error && <ConfirmationModal props={modalProps} />}

    </>
  )
}

export default SelectedActions
