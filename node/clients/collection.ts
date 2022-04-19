import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { ICollectionNative } from '../interfaces';

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
  public async deleteCollection(id: String): Promise<any> {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.delete(`api/catalog/pvt/collection/${id}`, config);
  }
  public async cloneCollection(collection: ICollectionNative): Promise<any> {
    var config = {
      Name: collection.name,
      Description: collection.description,
      Searchable: collection.searchable,
      Highlight: collection.highlight,
      DateFrom: collection.dateFrom,
      DateTo: collection.dateTo,
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}
    };
    return await this.http.post('api/catalog/pvt/collection', config);
  }

  /* public async addProductToCollection()  ....a desarrollar... */
}
