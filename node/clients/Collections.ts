import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api';
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
  public async getCollections(): Promise<IOResponse<any>> {
    return this.http.get('https://arcencohogareasy.myvtex.com.br/api/catalog_system/pvt/collection/search?page=1&pageSize=20&orderByAsc=true',);
  }
}

