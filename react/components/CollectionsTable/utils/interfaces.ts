export interface IUseCloneCollectionResponse {
  success: boolean
  itemsSuccess: Array<ISuccessItem>
}
export interface ISuccessItem {
  id: number
  success: boolean
  error?: any
}
export interface IUseDeleteCollectionResponse {
  success: boolean
  itemsSuccess: Array<ISuccessItem>
}
