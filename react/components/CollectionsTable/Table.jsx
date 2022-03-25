import React, { useContext, useState } from 'react'
import { CollectionManagerContext } from '../../context';
const Table = () => {
  const {data, tableKeys, searchParams, setSearchParams, paginationProps, actualPage } = useContext(CollectionManagerContext)
/*   const [checked, setchecked] = useState(false) */
  const getDataIntoElementByIndex = (indexOfElement) => {
    console.log("index of element", indexOfElement);
    if (indexOfElement >= 0 && data[actualPage]) {
      console.log("datta en la func", data[0]);
      let elements = Object.entries(data[actualPage][indexOfElement])
      console.log("elements", elements);
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

/*   const handleChange = () => {
    setSearchParams({...searchParams, active: !checked})
    setchecked(!checked);
  }; */
  return (
    <>
     {/*  <label>
        <input type="checkbox"
        checked={checked}
        onChange={handleChange}
        />
        Active
      </label> */}
    <table>
     <thead>
        <tr>
          {tableKeys.map((item, index) => <td>{item}</td>)}
        </tr>
      </thead>
      <tbody>

        {data && Object.entries(data[actualPage]).map((_, index) => <tr>{getDataIntoElementByIndex(index)}</tr>)}
      </tbody>
    </table>
  </>
  )
}

export default Table
