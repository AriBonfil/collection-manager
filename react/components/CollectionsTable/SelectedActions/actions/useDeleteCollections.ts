interface IUseDeleteCollectionResponse {
  success: boolean
  itemsSuccess: Array<ISuccessItem>
}
interface ISuccessItem {
  id: string
  success: boolean
  error?: any
}
export default async function useDeleteCollections(arrIds: Array<string>) {
  let itemsSuccess: Array<ISuccessItem> = []

  let response: IUseDeleteCollectionResponse = {
    success: false,
    itemsSuccess,
  }

  if (arrIds.length > 0) {
     const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }

    for (let i = 0; i < arrIds.length; i++) {
      fetch(`/_v/collections/delete/${arrIds[i]}`, options)
        .then((r) => r.json())
        .then(() => {
          itemsSuccess.push({
            id: arrIds[i],
            success: true,
          })
        })
        .catch((err) => {
          itemsSuccess.push({
            id: arrIds[i],
            success: false,
            error: err,
          })
        })
    }

    response.success =
      itemsSuccess.filter((item) => !item.success).length > 0 ? false : true
  }
  return response
}
