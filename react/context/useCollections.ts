import React, { useEffect } from "react";
import { useState } from "react";
import { request, useResource } from "react-request-hook";
import { NumberParam,withDefault, StringParam, createEnumParam, QueryParamConfig } from "use-query-params";
import {EXPERIMENTAL_useTableSort} from "vtex.styleguide";
import { useQueryParamsInVtex } from "../utils/use-query-params";

export interface CollectionsResponse {
  items:      ICollection[];
  pagination: Pagination;
}

export interface ICollection {
  id:             number;
  name:           string;
  searchable:     boolean;
  description?:   boolean;
  highlight:      boolean;
  dateFrom:       string;
  dateTo:         string;
  totalSku:       number;
  totalProducts:  number;
  type:           Type;
  lastModifiedBy: null;
  active:         boolean;
  persistent:     boolean
}

export enum Type {
  Automatic = "Automatic",
  Manual = "Manual",
}

export interface Pagination {
  perPage: number;
  total:   number;
  pages:   number;
}

export enum GetType{
  ACTIVE = "active",
  INACTIVE = "inactive",
  ALL = "all"
}

export type useCollectionsProps = {
  get?: GetType
}

const useFindCollections = ({get}:useCollectionsProps)=>{
    const [cound, setCound] = useState(0);
    const [{data, isLoading, error}] = useResource(()=> request<CollectionsResponse>({
      url: `collections`,
      method: "GET",
      params:{
        get
      }
  }),[cound, get] as any);

  return [data, isLoading,error, ()=> setCound(cound+1)] as [typeof data,typeof isLoading,typeof error,()=>void]
}

export const useCollections = ()=>{
  const [cound, setCound] = useState(0)
  const [queryParams, setQueryParams] = useQueryParamsInVtex({
    q:  withDefault(StringParam, null),
    page: withDefault(NumberParam, 0),
    pageSize: withDefault(NumberParam, 10),
    status: withDefault(createEnumParam(["active","inactive","all"]),GetType.ALL) as QueryParamConfig<string | null | undefined, GetType>,
    soft: withDefault(StringParam, null),
  });

  const sorting = EXPERIMENTAL_useTableSort(queryParams.soft?JSON.parse(queryParams.soft):undefined)
  useEffect(()=> {
    setQueryParams({page: 0 , soft: JSON.stringify(sorting.sorted)})
  },[sorting.sorted]);

  const [collections, isLoading, errorCollection, forceUpdate] = useFindCollections({get: GetType.ALL});

  const {items, pagination} = React.useMemo(() => {
    if(!collections?.items) return {};

    var list = collections.items;
    var fakeTotal;

    if(sorting.sorted.by) {
      const by = sorting.sorted.by;
      const n = sorting.sorted.order === 'ASC'?-1:1;
      list = list.sort((a,b)=> {
        if(by === "id") return (a.id-b.id) * n;
        if(by === "name") return (a.name<b.name?1:-1)*n;
        if(by === "products") return (a.totalProducts-b.totalProducts) * n;
        if(by === "active") return ((a.active && !b.active)? 1 :-1)*n;
        throw new Error(`Soft '${by}' no compatible`);
      });
    }

    if(queryParams.status !== GetType.ALL) {
      if(queryParams.status === GetType.ACTIVE) list = list.filter(i=> i.active === true);
      if(queryParams.status === GetType.INACTIVE) list = list.filter(i=> i.active === false);
      fakeTotal = list.length;
    }

    if(queryParams.q) {
      list = list.filter(i=> i.name.toLowerCase().includes((queryParams as any).q.toLowerCase()));
      fakeTotal = list.length;
    }

    list = list.slice(queryParams.pageSize * queryParams.page, queryParams.pageSize * (queryParams.page + 1))

    return {
      items: list,
      pagination: {
        ...collections?.pagination,
        ...fakeTotal !== undefined?{ total: fakeTotal }:{}
      }
    }
  }, [
    sorting.sorted,
    collections?.items,
    queryParams.status,
    queryParams.pageSize,
    queryParams.page,
    queryParams.q
  ])

  useEffect(()=>{
    // collections?.items.filter(i=> Date.parse(i.dateTo) < (new Date().getTime() + 1000 * 60 * 60 * 24 * 35));
  },[]);

  return {
    errorCollection,
    isLoading,
    queryParams,
    sorting,
    setQueryParams,
    forceUpdate,
    renderUpdate: ()=> setCound(cound + 1),
    itemsAll: collections?.items,
    items,
    pagination,
  }
}
