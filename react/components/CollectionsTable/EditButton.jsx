import React, {useContext} from 'react'
import styled from 'styled-components'
import { CollectionManagerContext } from '../../context';
const EditButton = () => {
const {editMode, setEditMode} = useContext(CollectionManagerContext)
  const EditButton = styled.button`
  border-radius: 4px;
  background-color: white;
  border-color: lightgray
  `
  return (
    <EditButton onClick={() => setEditMode(!editMode)}>{editMode ? 'Done' : 'Edit'}</EditButton>
  )
}

export default EditButton
