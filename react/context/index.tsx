import React, {useContext} from "react";
import { useModalConfirm } from "../components/CollectionsTable/components/confirm";
import { useModalImport } from "../components/CollectionsTable/components/import";
import { useCollections } from "./useCollections";

const CONTEXT = React.createContext<CollectionManagerType>({} as any);
export type CollectionManagerType = ReturnType<typeof BUILD>;
const BUILD = ()=>{
  const collections = useCollections()
  const modalImport = useModalImport()
  const modalConfirm = useModalConfirm();
  return {
    collections,
    modalImport,
    modalConfirm
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
