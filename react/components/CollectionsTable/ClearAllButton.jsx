import React, {useContext} from 'react'
import styled from 'styled-components'
import { CollectionManagerContext } from '../../context';
const ClearAllButton = () => {
const {editMode, selectedItems, setSelectedItems} = useContext(CollectionManagerContext)
  const ClearAllButton = styled.button`
  border-radius: 4px;
  background-color: white;
  border-color: lightgray
  `
  return (
    <>
    {editMode && selectedItems.length > 0 &&  (

    <>
    <p>{selectedItems.length} Collecciones Seleccionadas</p>
    <ClearAllButton onClick={() => setSelectedItems([])}>Clear All Selected</ClearAllButton>
    </>
    )}
    </>
  )
}

export default ClearAllButton
