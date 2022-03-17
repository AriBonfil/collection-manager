import React, {useState, useEffect} from 'react'

const CollectionsTable = () => {

  const [data, setData] = useState({})
  const [tableKeys, setTableKeys] = useState([])

  useEffect(() => {
    fetch('/_v/collections')
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
    .catch(err => console.error(err));
  }, [])

  useEffect(() => {
 if(data[0]){
  setTableKeys(Object.keys(data[0]))
 }
 }, [data])


const getDataIntoElementByIndex = (indexOfElement) => {
  if(indexOfElement)
  {
    let elements = Object.entries(data[indexOfElement])
    console.log("elllements", elements);
    const getParsedValue = (value) => {
      if(value){
        console.log("typeofs", typeof(value));
        if(typeof(value) === 'string' || typeof(value) === 'number')
        {
          return value.toString()
        }
        else if (typeof(value) === 'boolean')
        {
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



  return (
    <>
    <table>
        <thead>
          <tr>
          {tableKeys.map((item, index) => <td>{item}</td>)}
          </tr>
        </thead>
        <tbody>
        {Object.entries(data).map((_, index) => <tr>{getDataIntoElementByIndex(index)}</tr>)}
        </tbody>
       </table>
       </>
  )


}
export default CollectionsTable
