import React, {useState, useContext} from "react";
import { useCollections, useCollectionsProps } from "../components/CollectionsTable/SelectedActions/actions/useCollections";

const CONTEXT = React.createContext<CollectionManagerType>({} as any);
export type CollectionManagerType = ReturnType<typeof BUILD>;
const BUILD = ()=>{

  const [searchParams, setSearchParams] = useState<useCollectionsProps>({
    get: 'all',
  })
  // const [refresh, setRefresh] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [editMode, setEditMode] = useState(false)
  const [actualPage, setactualPage] = useState(1)
  const [paginationProps, setpaginationProps] = useState<{
    total?: number,
    show?: boolean,
    pageSize?: number
  }>({})

  const collections = useCollections({
    ...searchParams
  });

  // useEffect(() => {
  //   let queryString = Object.keys(searchParams).map(key => key + '=' + (searchParams as any)[key]).join('&');
  //   fetch(`/_v/collections?${queryString}`)
  //     .then(res => res.json())
  //     .then((resJson:CollectionsResponse) => {
  //       if(resJson) {
  //         let dataToSet = getChunkedArrayByPagination(resJson.items, resJson.pagination)
  //         setData(dataToSet)
  //         setactualPage(1)
  //         setSelectedItems([])
  //         setpaginationProps({
  //           total: resJson.pagination?.total,
  //           show: resJson.items?.length > 0 ? true : false,
  //           pageSize: resJson.pagination?.perPage
  //         })
  //       }
  //     })
  //     .catch(err => console.log("error al req", err));
  // }, [searchParams, refresh])

  // const getChunkedArrayByPagination = (items:ICollection[], pagination: CollectionsResponse["pagination"]) => {
  //   let chunkSize = pagination.perPage
  //   const res = [];
  //   for (let i = 0; i < items.length; i += chunkSize) {
  //       const chunk = items.slice(i, i + chunkSize);
  //       res.push(chunk);
  //   }
  //   return res;
  // }
  const isCollectionSelected = (id:number) => {
    return selectedItems.find(i => i === id)
  }

  const refreshData = () => {
    // setRefresh(Math.random())
  }


  return {
    collections,
    paginationProps,
    setpaginationProps,
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
