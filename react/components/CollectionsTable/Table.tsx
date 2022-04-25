import React from 'react'
import { useCollectionManager } from '../../context'
import './Table.css'

const Table = () => {
  const {
    data,
    tableKeys,
    editMode,
    selectedItems,
    setSelectedItems,
    actualPage,
    isCollectionSelected
  } = useCollectionManager();

  const getDataIntoElementByIndex = (indexOfElement:number) => {
    if (indexOfElement >= 0 && data[actualPage - 1]) {
      const getParsedValue = (value: string | number) => {
        if (value) {
          if (typeof value === 'string' || typeof value === 'number') {
            return value.toString()
          } else if (typeof value === 'boolean') {
            return value ? 'Si' : 'No'
          } else {
            return ''
          }
        }
        return undefined;
      }
      let item = data[actualPage - 1][indexOfElement]
      return Object.entries(item).map((value, index) => (
        <td key={index}>{getParsedValue(value[1])}</td>
      ))
    }
    return undefined;
  }
  const handleItemClick = (d: (typeof data)[0][0]) => {
    if (!editMode) {
      if (window.location && d.id) {
        location.href = `${window.location.href}/detail/${d.id}`
      }
    } else {
      if (!isCollectionSelected(d.id)) {
        setSelectedItems([...selectedItems, d.id])
      } else {
        setSelectedItems(selectedItems.filter((i) => i !== d.id))
      }
    }
  }

  return (
    <>
    AWFWAF
      <table className="collectionTable">
        <thead>
          <tr>
            {tableKeys.map((item) => (
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
