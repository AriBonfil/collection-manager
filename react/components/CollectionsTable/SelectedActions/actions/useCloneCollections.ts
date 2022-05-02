import {ISuccessItem, IUseCloneCollectionResponse } from './interfaces'

export default async function useCloneCollections(arrIds: Array<number>) {
  let itemsSuccess: Array<ISuccessItem> = []

  let response: IUseCloneCollectionResponse = {
    success: false,
    itemsSuccess,
  }

  if (arrIds.length > 0) {
     const options:Parameters<typeof fetch>[1] = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        type: "clone",
        params: arrIds.map(id=> ({id}))
      })
    }

    var result = await fetch(`/_v/collections/tasks`, options)
    const data = await result.json();
    console.log(data);

    response.success = itemsSuccess.filter((item) => !item.success).length > 0 ? false : true
  }

  return response
}
