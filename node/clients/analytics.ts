//node/clients/analytics.ts
import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
import { headers } from '../utils/headers'

export default class Analytics extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
      super(`http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options && options.headers),
          'x-vtex-api-appKey': headers[context.account].appKey,
          'x-vtex-api-appToken': headers[context.account].appToken,
          'x-vtex-use-https': 'true',
        },
      }
    )
  }

  public getLiveUsers(): String {
 /*    let ret : any = {}
    Axios.get('/api/catalog_system/pvt/collection/search')
    .then(r => r)
    .then(j => ret = j) */
    return "asd"
  }
}


