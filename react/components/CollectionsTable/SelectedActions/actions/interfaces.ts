export interface IUseCloneCollectionResponse {
  success: boolean
  itemsSuccess: Array<ISuccessItem>
}
export interface ISuccessItem {
  id: string
  success: boolean
  error?: any
}
export interface IUseDeleteCollectionResponse {
  success: boolean
  itemsSuccess: Array<ISuccessItem>
}
