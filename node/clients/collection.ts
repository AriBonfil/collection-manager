import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { ICollectionNative, ICollectionsProductItemResponse, ICollectionsProductsResponse, ICollectionNativeUpper } from '../interfaces';
import FormData from 'form-data'
import XLSX from "xlsx";

export default class Collection extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'Content-Type': 'application/json',
          'cache-control': "no-cache",
          'VtexIdclientAutCookie': context.adminUserAuthToken || context.authToken,
        },
        timeout: 10000,
      }
    )
  }


  public async getCollections(pageNumber: Number, pageSize: Number): Promise<any> {
    return await this.http.get(`/api/catalog_system/pvt/collection/search?page=${pageNumber}&pageSize=${pageSize}&orderByAsc=true`);
  }
  public async getInactiveCollections(): Promise<any> {
    return await this.http.get('/api/catalog/pvt/collection/inactive');
  }
  public async getCollection(id: String | number): Promise<ICollectionNativeUpper> {
      var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
      return await this.http.get(`/api/catalog/pvt/collection/${id}`, config);
  }
  public async CreateCollection(values: ICollectionNative): Promise<any>  {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.post('api/catalog/pvt/collection', JSON.stringify(values), config);
  }
  public async getCollectionProducts(id: String | number, page: Number) {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.get<ICollectionsProductsResponse>(`api/catalog/pvt/collection/${id}/products?page=${page}&pageSize=50`, config);
  }
  public async deleteCollection(id: String | number): Promise<any> {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.delete(`api/catalog/pvt/collection/${id}`, config);
  }


  public async *getCollectionProductsYield(id: String | number) {
    const collectionProducts = await this.getCollectionProducts(id, 1)
    for (let i = 0; i < collectionProducts?.TotalPage;i++) {
      let res = await this.getCollectionProducts(id, i+1)
      if(res?.Data)  yield {items: res.Data, progreso: i/collectionProducts?.TotalPage};
    }
  }

  public async AddProductsInCollection(id: Number, Ids: {sku?: number, product?: number}[]) {
    const items = Ids.map(({product, sku})=>([sku,product,,]));
    const data = [
      ["SKU", "PRODUCTID", "SKUREFID", "PRODUCTREFID"],
      ...items
    ];
		const ws = XLSX.utils.aoa_to_sheet(data);

		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws);
    const wbrite = XLSX.write(wb, {bookType:"xls", type:"buffer"});

    for (let index = 0; index < 5; index++) {
      const formData = new FormData()

      formData.append('file', wbrite, "file.xls")

      const config:RequestConfig = {
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Content-Type': `multipart/form-data; charset=utf-8; boundary="${formData.getBoundary()}"`,
          "knownLength": 1
        }
      };
      const result = await this.http.post<{
        TotalItemProcessed: number,
        TotalErrorsProcessed: number,
        TotalProductsProcessed: number,
        Errors: any[]
      }>(`api/catalog/pvt/collection/${id}/stockkeepingunit/importinsert`, formData, config);
      console.log("🧊",result, Ids);
      if(result.TotalProductsProcessed > 0 || items.length === 0) return result;
    }
    throw new Error(`Algo fallo al agregar productos a la collection ${id}`);
  }

  public async cloneCollection(id: string | number, progreso?: (n:number)=>void ) {
    const origin = await this.getCollection(id);
    const newCollecion = await this.CreateCollection({
      name: origin.Name + " (clone)",
      description: origin.Description,
      searchable: origin.Searchable,
      highlight: origin.Highlight,
      dateFrom: origin.DateFrom,
      dateTo: origin.DateTo
    });
    const iteratorProducts = this.getCollectionProductsYield(id);
    while (true) {
      let finish = false;
      let delayProducts: ICollectionsProductItemResponse[] = [];
      for (let index = 0; delayProducts.length < 250; index++) {
        const {value, done} = await iteratorProducts.next();
        if(done){
          finish = true;
          break;
        }
        if(value && Array.isArray(value.items)){
          if(progreso) await progreso(value.progreso);
          delayProducts.push(...value.items);
        }
      }
      await this.AddProductsInCollection(newCollecion.Id, delayProducts.map(p=> ({product: p.ProductId, sku: p.SkuId})));
      delayProducts = [];
      if(finish) break;
    }

    return {
      ...await this.getCollection(newCollecion.Id.toString()),
      origin
    };
  }

  /* public async addProductToCollection()  ....a desarrollar... */
}
