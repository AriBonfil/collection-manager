import React, {useState, useEffect} from "react";
export const CollectionManagerContext = React.createContext();
const ITEMS_PER_PAGE = 50
export const CollectionManagerProvider = ({children}) => {

  const [data, setData] = useState({})
  const [tableKeys, setTableKeys] = useState([])
  const [searchParams, setSearchParams] = useState({
    actualPage: 1
  })
  const [paginationProps, setpaginationProps] = useState({})


  useEffect(() => {
    fetch(`/_v/collections?page=${searchParams.actualPage}`)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson.data)
        console.log("resjson", resJson);
        setpaginationProps({
          total: resJson.pagination.total,
          show: resJson.data.length > 0 ? true : false,
          pageSize: resJson.pagination.perPage
        })
        setTableKeys(Object.keys(resJson.data[0]))
      })
      .catch(err => console.error(err));
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

