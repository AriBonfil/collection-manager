import { useState } from "react";
import { request, useResource } from "react-request-hook";
import { useQueryParams, NumberParam,withDefault } from "use-query-params";

export interface CollectionsResponse {
  items:      ICollection[];
  pagination: Pagination;
}

export interface ICollection {
  id:             number;
  name:           string;
  searchable:     boolean;
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
  const [cound, setCound] = useState(0);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 0),
    pageSize: withDefault(NumberParam, 10),
  });

  const [{data, isLoading, error}] = useResource(()=> request<CollectionsResponse>({
      url: `collections`,
      method: "GET",
      params:{
        page: queryParams.page,
        get: "all",
        ...params
      }
  }),[] as any);

  return {
    isLoading,
    error,
    queryParams,
    setQueryParams: (v:Parameters<typeof setQueryParams>[0])=>{
      setQueryParams(v, "pushIn");
      setCound(cound+1)
    },
    items: data?.items,
    pagination: data?.pagination,
  }
}
