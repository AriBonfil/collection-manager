import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { headers } from '../utils/headers'


export default class Collections extends ExternalClient {

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
  public async getAllCollections(): Promise<any> {
    console.log("getting collections...")
    return this.http.getRaw('https://arcencohogareasy.myvtex.com.br/api/catalog_system/pvt/collection/search?page=1&pageSize=20&orderByAsc=true')
  }

}

