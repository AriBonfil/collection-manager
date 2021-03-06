import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Collection extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'Content-Type': 'application/json',
          'VtexIdclientAutCookie': context.adminUserAuthToken || context.authToken,
        },
      }
    )
  }


  public async getActiveCollections(page: Number, pageSize: Number): Promise<any> {
    return await this.http.get(`/api/catalog_system/pvt/collection/search?page=${page}&pageSize=${pageSize}`);
  }
  public async getInactiveCollections(): Promise<any> {
    return await this.http.get('/api/catalog/pvt/collection/inactive');
  }

}
