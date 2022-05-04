import {ISuccessItem, IUseCloneCollectionResponse } from './interfaces'

export async function CloneManyCollections(arrIds: Array<number>) {
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
    await result.json();

    response.success = itemsSuccess.filter((item) => !item.success).length > 0 ? false : true
  }

  return response
}

export async function DeleteManyCollections(arrIds: Array<number>) {
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
        'Cache-Control':'no-store'
      },
      body: JSON.stringify({
        type: "delete",
        params: arrIds.map(id=> ({id}))
      })
    }

    var result = await fetch(`/_v/collections/tasks`, options)
    await result.json();
    response.success = itemsSuccess.filter((item) => !item.success).length > 0 ? false : true
  }

  return response
}
