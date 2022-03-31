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


  public async getCollections(pageNumber: Number, pageSize: Number): Promise<any> {
    return await this.http.get(`/api/catalog_system/pvt/collection/search?page=${pageNumber}&pageSize=${pageSize}&orderByAsc=true`);
  }
  public async getInactiveCollections(): Promise<any> {
    return await this.http.get('/api/catalog/pvt/collection/inactive');
  }
  public async getCollection(id: String): Promise<any> {
      var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
      return await this.http.get(`/api/catalog/pvt/collection/${id}`, config);
  }
  public async getCollectionProducts(id: String, page: Number): Promise<any> {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.get(`api/catalog/pvt/collection/${id}/products?page=${page}`, config);
}
}
