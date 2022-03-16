import React from 'react'
import { useQuery } from 'react-apollo'
import helloworld from '../../graphql/helloworld.gql'
const CollectionsTable = () => {
  const { data } = useQuery(helloworld)
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-VTEX-API-AppKey': 'vtexappkey-arcencohogar-ALVTUC',
      'X-VTEX-API-AppToken': 'KQOOLSLDMQAJVLJBVQBSSICXGEVDGWELUKTQBDWPCQYFBRNCXFYPPHFBNQHHXHWQMPOLRTASUMQBKXVPQTFAXPWNFSCKVORUUHTLDBKEFGVDRDRQVSQECWTWTBGZQPWF'
    }
  };

  fetch('/api/catalog_system/pvt/collection/search', options)
    .then(response => response.json())
    .then(response => console.log("RERER", response))
    .catch(err => console.error(err));

  return <div>{data?.helloworld}</div>
}
export default CollectionsTable
