import React, { useState, useContext } from 'react'
import useDeleteCollections from './actions/useDeleteCollections'
import { CollectionManagerContext } from '../../../context'
import styled from 'styled-components'
import ConfirmationModal from './ConfirmationModal'
const SelectedActions = () => {
  const { selectedItems, editMode } = useContext(CollectionManagerContext)
  const [showActions, setShowActions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState(null)
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
  return (
    <>
      {selectedItems.length > 0 && editMode && (
        <FixedContent>
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

          <p onClick={() => setShowActions(!showActions)}>Acciones</p>
        </FixedContent>

      )}
      {showModal && action && <ConfirmationModal action={action}/>}
    </>
  )
}

export default SelectedActions
