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
export interface IPagination {
  page: Number,
  perPage: Number,
  total: Number,
  pages: Number
}
export interface ICollectionsResponse {
  data?: Array<ICollection>,
  pagination?: IPagination
}
