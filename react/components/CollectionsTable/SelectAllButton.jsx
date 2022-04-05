import React, {useContext} from 'react'
import styled from 'styled-components'
import { CollectionManagerContext } from '../../context';
const SelectAllButton = () => {
const {editMode, selectedItems, setSelectedItems, data} = useContext(CollectionManagerContext)
  const ButtonSelectAll = styled.button`
  border-radius: 4px;
  background-color: white;
  border-color: lightgray
  `
  const selectAllCollections = () => {
    if(data){
      let newArr = []
    for (let i = 0; i < data.length; i++) {
      for (let x = 0; x < data[i].length; x++) {
        newArr.push(data[i][x].id)
      }
    }
    setSelectedItems(newArr)
  }
  }
  return (
    <>
    {editMode &&  (

    <>
    <ButtonSelectAll onClick={() => selectAllCollections()}>Select All</ButtonSelectAll>
    </>
    )}
    </>
  )
}

export default SelectAllButton
