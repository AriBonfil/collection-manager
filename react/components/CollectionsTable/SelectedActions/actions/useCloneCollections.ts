import {ISuccessItem, IUseCloneCollectionResponse } from './interfaces'

export default async function useCloneCollections(arrIds: Array<number>) {
  let itemsSuccess: Array<ISuccessItem> = []

  let response: IUseCloneCollectionResponse = {
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
      await fetch(`/_v/collections/clone/${arrIds[i]}`, options)
        .then((r) => r.json())
        .then(() => {
          itemsSuccess.push({
            id: arrIds[i],
            success: true,
          })
        })
        .catch((err) => {
          console.log("err", err)
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
