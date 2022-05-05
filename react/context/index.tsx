import React, {useState, useContext} from "react";
import { useCollections, useCollectionsProps } from "../components/CollectionsTable/SelectedActions/actions/useCollections";

const CONTEXT = React.createContext<CollectionManagerType>({} as any);
export type CollectionManagerType = ReturnType<typeof BUILD>;
const BUILD = ()=>{

  const [searchParams, setSearchParams] = useState<useCollectionsProps>({
    get: 'all',
  })
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
