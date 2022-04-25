import React from 'react'
import styled from 'styled-components'
import { useCollectionManager } from '../../context';

const EditButton = () => {
  const {editMode, setEditMode} = useCollectionManager();

  const EditButton = styled.button`
    border-radius: 4px;
    background-color: white;
    border-color: lightgray
  `;

  return (
    <EditButton onClick={() => setEditMode(!editMode)}>{editMode ? 'Done' : 'Edit'}</EditButton>
  )
}

export default EditButton
