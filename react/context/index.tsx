import React, {useContext} from "react";
import { useCollections } from "./useCollections";

const CONTEXT = React.createContext<CollectionManagerType>({} as any);
export type CollectionManagerType = ReturnType<typeof BUILD>;
const BUILD = ()=>{
  return useCollections();
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
