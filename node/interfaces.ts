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
