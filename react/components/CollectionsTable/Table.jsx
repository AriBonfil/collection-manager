import React, { useContext, useState } from 'react'
import { CollectionManagerContext } from '../../context';

const Table = () => {
const {data, tableKeys, searchParams, setSearchParams, paginationProps, actualPage } = useContext(CollectionManagerContext)
  const getDataIntoElementByIndex = (indexOfElement) => {
    if (indexOfElement >= 0 && data[actualPage - 1]) {
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
      let item = data[actualPage - 1][indexOfElement]
      return Object.entries(item).map((value, index) => <td key={index}>{getParsedValue(value[1])}</td>)
    }
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

        {data && data[actualPage - 1] && data[actualPage - 1].map((_, index) => <tr>{getDataIntoElementByIndex(index)}</tr>)}
      </tbody>
    </table>
  </>
  )
}

export default Table
