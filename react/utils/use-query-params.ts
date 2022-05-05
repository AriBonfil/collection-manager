
import { useEffect, useRef, useState } from "react";
import { QueryParamConfigMap, useQueryParams } from "use-query-params";

export const useQueryParamsInVtex = <T extends QueryParamConfigMap>(args:T)=>{
  const [cound, setCound] = useState(0);
  const [queryParams, setQueryParams] = useQueryParams(args);

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

  return [
    queryParams,
    (...args: Parameters<typeof setQueryParams>):ReturnType<typeof setQueryParams>=>{
      setQueryParams(...args);
      setCound(cound+1)
    }
  ] as [typeof queryParams, typeof setQueryParams];
}
