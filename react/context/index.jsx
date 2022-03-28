import React, {useState, useEffect} from "react";
export const CollectionManagerContext = React.createContext();
const ITEMS_PER_PAGE = 50
export const CollectionManagerProvider = ({children}) => {

  const [data, setData] = useState({})
  const [tableKeys, setTableKeys] = useState([])
  const [searchParams, setSearchParams] = useState({
    active: true
  })
  const [actualPage, setactualPage] = useState(1)
  const [paginationProps, setpaginationProps] = useState({})

  console.log("data", data);
  useEffect(() => {
    let queryString = Object.keys(searchParams).map(key => key + '=' + searchParams[key]).join('&');
    fetch(`/_v/collections?${queryString}`)
      .then(res => res.json())
      .then(resJson => {
        if(resJson) {
        console.log("res de el req", resJson);
        let dataToSet = getChunkedArrayByPagination(resJson.items, resJson.pagination)
        setData(dataToSet)
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

  const getChunkedArrayByPagination = (items, pagination) => {
    let chunkSize = pagination.perPage
    const res = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        res.push(chunk);
    }
    console.log("chunked array: ", res);
    return res;
  }

  let control =
  {
    data,
    paginationProps,
    setpaginationProps,
    tableKeys,
    searchParams,
    setSearchParams,
    actualPage,
    setactualPage
  }


  return (
    <CollectionManagerContext.Provider value={control}>
  {children}
    </CollectionManagerContext.Provider>
  );
}

