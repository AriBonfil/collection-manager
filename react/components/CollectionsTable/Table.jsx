import React, { useContext, useState } from 'react'
import { CollectionManagerContext } from '../../context'
import './Table.css'
import styled from 'styled-components'

const Table = () => {
  const {
    data,
    tableKeys,
    editMode,
    selectedItems,
    setSelectedItems,
    actualPage,
    isCollectionSelected
  } = useContext(CollectionManagerContext)

  const getDataIntoElementByIndex = (indexOfElement) => {
    if (indexOfElement >= 0 && data[actualPage - 1]) {
      const getParsedValue = (value) => {
        if (value) {
          if (typeof value === 'string' || typeof value === 'number') {
            return value.toString()
          } else if (typeof value === 'boolean') {
            return value ? 'Si' : 'No'
          } else {
            return ''
          }
        }
      }
      let item = data[actualPage - 1][indexOfElement]
      return Object.entries(item).map((value, index) => (
        <td key={index}>{getParsedValue(value[1])}</td>
      ))
    }
  }
  const handleItemClick = (data) => {
    if (!editMode) {
      if (window.location && data.id) {
        location.href = `${window.location.href}/detail/${data.id}`
      }
    } else {
      if (!isCollectionSelected(data.id)) {
        setSelectedItems([...selectedItems, data.id])
      } else {
        setSelectedItems(selectedItems.filter((i) => i !== data.id))
      }
    }
  }

  return (
    <>
      <table className="collectionTable">
        <thead>
          <tr>
            {tableKeys.map((item, index) => (
              <td>{item}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data[actualPage - 1] &&
            data[actualPage - 1].map((data, index) => (
              <tr key={index} style={{backgroundColor: isCollectionSelected(data.id) && editMode ? 'lightgoldenrodyellow' : '#ffff'}} onClick={() => handleItemClick(data)}>
                {getDataIntoElementByIndex(index)}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Table
