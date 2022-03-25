import React, {useState, useEffect} from "react";
export const CollectionManagerContext = React.createContext();
const ITEMS_PER_PAGE = 50
export const CollectionManagerProvider = ({children}) => {

  const [data, setData] = useState({})
  const [tableKeys, setTableKeys] = useState([])
  const [searchParams, setSearchParams] = useState({

  })
  const [actualPage, setactualPage] = useState(1)
  const [paginationProps, setpaginationProps] = useState({})


  useEffect(() => {
    let queryString = Object.keys(searchParams).map(key => key + '=' + searchParams[key]).join('&');
    fetch(`/_v/collections?${queryString}`)
      .then(res => res.json())
      .then(resJson => {
        if(resJson) {
        setData(resJson.data)
        console.log("resjson", resJson);
        setpaginationProps({
          total: resJson.pagination?.total,
          show: resJson.data?.length > 0 ? true : false,
          pageSize: resJson.pagination?.perPage
        })
        resJson.data && setTableKeys(Object.keys(resJson.data[0]))
      }
      })
      .catch(console.error('Algo fallo en el request al servicio'));
  }, [searchParams])


  let control =
  {
    data,
    paginationProps,
    setpaginationProps,
    tableKeys,
    searchParams,
    setSearchParams
  }


  return (
    <CollectionManagerContext.Provider value={control}>
  {children}
    </CollectionManagerContext.Provider>
  );
}

