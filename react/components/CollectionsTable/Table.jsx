import React from 'react'
import { useContext } from 'react';
import { CollectionManagerContext } from '../../context';
const Table = () => {
  const {data, tableKeys, searchParams, paginationProps } = useContext(CollectionManagerContext)

  const getDataIntoElementByIndex = (indexOfElement) => {
    if (indexOfElement && data) {
      let elements = Object.entries(data[indexOfElement])
      const getParsedValue = (value) => {
        if (value) {
          if (typeof (value) === 'string' || typeof (value) === 'number') {
            return value.toString()
          }
          else if (typeof (value) === 'boolean') {
            return value ? "Si" : "No"
          }
          else {
            return ''
          }
        }

      }
      return elements.map((value, index) => <td>{getParsedValue(value[1])}</td>)
    }
  }
  const filterByParams = () => {
    return data
  }

  return (
    <>
    <table>
     <thead>
        <tr>
          {tableKeys.map((item, index) => <td>{item}</td>)}
        </tr>
      </thead>
      <tbody>

        {data && Object.entries(filterByParams(data)).map((_, index) => <tr>{getDataIntoElementByIndex(index)}</tr>)}
      </tbody>
    </table>
  </>
  )
}

export default Table
