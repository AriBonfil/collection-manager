export default async function useDeleteCollections(arrIds) {
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
        .then((response) => response.json())
        .then((response) => {
          console.log('Item eliminado correctamente', arrIds[i])
        })
        .catch((err) => {
          console.log('Item no se pudo eliminar', arrIds[i])
          console.error(err)
        })
    }
  }
}
