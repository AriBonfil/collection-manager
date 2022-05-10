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

export async function BlockPushManyCollections(arrIds: Array<number>) {

  if (arrIds.length > 0) {
     const options:Parameters<typeof fetch>[1] = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':'no-store'
      },
      body: JSON.stringify({
        ids: arrIds.map(id=> id)
      })
    }

    const {status} = await fetch(`/_v/collections/blocks`, options)
    if(status !== 200) throw new Error("Algo fallo");
  }

  return arrIds
}

export async function BlockDeleteManyCollections(arrIds: Array<number>) {

  if (arrIds.length > 0) {
     const options:Parameters<typeof fetch>[1] = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':'no-store'
      },
      body: JSON.stringify({
        ids: arrIds.map(id=> id)
      })
    }

    const {status} = await fetch(`/_v/collections/blocks`, options)
    if(status !== 200) throw new Error("Algo fallo");
  }

  return arrIds
}