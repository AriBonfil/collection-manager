import React, { useContext, useEffect, useRef, useState } from "react"

function transformToAssocArray(prmstr:string) {
  var params:{[key:string]:string} = {}
  var prmarr = prmstr.split('&')
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split('=')
    params[tmparr[0]] = decodeURIComponent(tmparr[1])
  }
  return params
}
export function getSearchParameters() {
  var prmstr = window.location.search.substr(1)
  return prmstr != null && prmstr != '' ? transformToAssocArray(prmstr) : {}
}

export function BUILD() {
  const [cound, setCound] = useState(0)
  const searchParams = getSearchParameters()
  const _ref = {setCound, cound};
  const ref = useRef<typeof _ref>();
  ref.current = _ref;

  useEffect(()=>{
    function event() {
      ref.current?.setCound(ref.current.cound+1);
    }
    window.addEventListener('popstate', event);
    return ()=> window.removeEventListener('popstate', event);
  },[]);

  function setQueryParams<T extends {[key:string]:string}>(args: T){
    const urlParams = new URLSearchParams(window.location.search)
    const obj = { ...searchParams } as any;
    Object.keys(args).forEach((key)=>{
      if (args[key]) {
        urlParams.set(key, args[key])
        obj[key] = args[key]
      }else{
        urlParams.delete(key)
        delete obj[key]
      }
    })
    history.pushState(obj, document.title, `?${urlParams.toString()}`)
    setCound(cound + 1)
  };

  return {
    searchParams,
    setQueryParams
  }
}

const CONTEXT = React.createContext<ReturnType<typeof BUILD>>({} as any);

export function ProviderSearchParameters({children}:any){
  const value = BUILD();

  return (
    <CONTEXT.Provider value={value}>
      {children}
    </CONTEXT.Provider>
  );
}

export function useSearchParameters<T extends {[key: string]:string | number | null}>(_default: Partial<T>){
  const {searchParams, setQueryParams} = useContext(CONTEXT);
  return {
    searchParams: {
      ..._default,
      ...searchParams
    } as T,
    setQueryParams: setQueryParams as (args: Partial<T>)=> void
  }
}
