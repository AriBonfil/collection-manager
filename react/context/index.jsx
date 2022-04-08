import React, {useState, useEffect} from "react";
export const CollectionManagerContext = React.createContext();
export const CollectionManagerProvider = ({children}) => {

  const [data, setData] = useState({})
  const [tableKeys, setTableKeys] = useState([])
  const [searchParams, setSearchParams] = useState({
    get: 'all',
  })
  const [refresh, setRefresh] = useState(1)
  const [selectedItems, setSelectedItems] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [actualPage, setactualPage] = useState(1)
  const [paginationProps, setpaginationProps] = useState({})

  useEffect(() => {
    
    let queryString = Object.keys(searchParams).map(key => key + '=' + searchParams[key]).join('&');
    fetch(`/_v/collections?${queryString}`)
      .then(res => res.json())
      .then(resJson => {
        if(resJson) {
        let dataToSet = getChunkedArrayByPagination(resJson.items, resJson.pagination)
        setData(dataToSet)
        setactualPage(1)
        setSelectedItems([])
        setpaginationProps({
          total: resJson.pagination?.total,
          show: resJson.data?.length > 0 ? true : false,
          pageSize: resJson.pagination?.perPage
        })
        if(resJson.items){
          setTableKeys(Object.keys(resJson.items[0]))
        }
      }
      })
      .catch(err => console.log("error al req", err));
  }, [searchParams, refresh])

  const getChunkedArrayByPagination = (items, pagination) => {
    let chunkSize = pagination.perPage
    const res = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }
  const isCollectionSelected = (id) => {
   return selectedItems.find(i => i === id)
  }
  const refreshData = () => {
  setRefresh(Math.random())
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
    setactualPage,
    editMode,
    setEditMode,
    selectedItems,
    setSelectedItems,
    isCollectionSelected,
    refreshData
  }


  return (
    <CollectionManagerContext.Provider value={control}>
  {children}
    </CollectionManagerContext.Provider>
  );
}

