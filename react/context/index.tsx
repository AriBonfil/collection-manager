import React, {useState, useEffect, useContext} from "react";

const CONTEXT = React.createContext<CollectionManagerType>({} as any);
export type CollectionManagerType = ReturnType<typeof BUILD>;
const BUILD = ()=>{
  const [data, setData] = useState<{
    id: string
  }[][]>([])
  //# ANY #
  const [tableKeys, setTableKeys] = useState<any[]>([])
  const [searchParams, setSearchParams] = useState<{[key: string]:string}>({
    get: 'all',
  })
  const [refresh, setRefresh] = useState(1)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [editMode, setEditMode] = useState(false)
  const [actualPage, setactualPage] = useState(1)
  const [paginationProps, setpaginationProps] = useState<{
    total?: number,
    show?: boolean,
    pageSize?: number
  }>({})

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

  //# ANY #
  const getChunkedArrayByPagination = (items:any[], pagination:any) => {
    let chunkSize = pagination.perPage
    const res = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }
  const isCollectionSelected = (id:string) => {
    return selectedItems.find(i => i === id)
  }

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
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
}

export const CollectionManagerProvider:React.FC<{}> = ({children}) => {
  const control = BUILD();
  return (
    <CONTEXT.Provider value={control}>
      {children}
    </CONTEXT.Provider>
  );
}

export const useCollectionManager = ()=>{
  return useContext(CONTEXT);
}
