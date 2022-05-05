import React from "react";
import { useState } from "react";
import { request, useResource } from "react-request-hook";
import {EXPERIMENTAL_useTableSort} from "vtex.styleguide";
import { useSearchParameters } from "../../../../utils/searchParameters";

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
export type useCollectionsProps = {
  get?: "active" | "inactive" | "all"
}

export const useCollections = (params:useCollectionsProps={})=>{
  const [cound2, setCound2] = useState(0);
  const [cound, setCound] = useState(0);
  const {searchParams, setQueryParams} = useSearchParameters<{q:string, page: string, pageSize: string}>({
    q:  undefined,
    page: "1",
    pageSize: "10",
  });
  const queryParams = {
    q: searchParams.q,
    page: parseInt(searchParams.page),
    pageSize: parseInt(searchParams.pageSize),
  }

  const sorting = EXPERIMENTAL_useTableSort()

  const [{data, isLoading, error}] = useResource(()=> request<CollectionsResponse>({
      url: `collections`,
      method: "GET",
      params:{
        page: queryParams.page,
        get: "all",
        ...params
      }
  }),[cound2, params] as any);


  const {items, pagination} = React.useMemo(() => {
    if(!data?.items) return {};

    var list = data.items;
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

    if(queryParams.q) {
      list = list.filter(i=> i.name.toLowerCase().includes((queryParams as any).q.toLowerCase()));
      fakeTotal = list.length;
    }

    list = list.slice(queryParams.pageSize * queryParams.page, queryParams.pageSize * (queryParams.page + 1))

    return {
      items: list,
      pagination: {
        ...data?.pagination,
        ...fakeTotal !== undefined?{ total: fakeTotal }:{}
      }
    }
  }, [
    sorting.sorted,
    data?.items,
    queryParams.pageSize,
    queryParams.page,
    queryParams.q
  ])

  return {
    isLoading,
    error,
    queryParams,
    sorting,
    setQueryParams: (v:Parameters<typeof setQueryParams>[0])=>{
      setQueryParams(v);
      setCound(cound+1)
    },
    forceUpdate: ()=>{
      setCound2(cound2+1);
    },
    items,
    pagination,
  }
}
