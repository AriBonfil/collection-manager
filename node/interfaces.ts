export interface ISearchParams {
  page: Number,
  pageSize: Number
}
export interface ICollection {
  id: Number,
  name: String,
  searchable: boolean,
  highlight: true,
  dateFrom: String,
  dateTo: String,
  totalSku: Number,
  totalProducts: Number,
  type: String,
  lastModifiedBy: any
  active: boolean
}
export interface ICollectionNative {
  id: Number,
  name: String,
  searchable: boolean,
  highlight: true,
  dateFrom: String,
  dateTo: String,
  totalSku: Number,
  totalProducts: Number,
  type: String,
  lastModifiedBy: any
}
export interface IPagination {
  perPage: Number,
  total: Number,
  pages: Number
}
export interface ICollectionsResponse {
  items?: Array<ICollection>,
  pagination?: IPagination
}
export interface ICollectionResponse {
  collection?: ICollection,
  products?: Array<IProduct>
}
export interface IProduct {

}
