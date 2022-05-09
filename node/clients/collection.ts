import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { ICollectionNative, ICollectionsProductItemResponse, ICollectionsProductsResponse, ICollectionNativeUpper } from '../interfaces';
import FormData from 'form-data'
import XLSX from "xlsx";

class ErrorInResponse extends Error {}

export default class Collection extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'Content-Type': 'application/json',
          'cache-control': "no-store",
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
    return await this.http.get<ICollectionsProductsResponse>(`api/catalog/pvt/collection/${id}/products?page=${page}&pageSize=50&t=${Date.now()}`, config);
  }
  public async deleteCollection(id: String | number): Promise<any> {
    var config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',}};
    return await this.http.delete(`api/catalog/pvt/collection/${id}`, config);
  }


  public async *getCollectionProductsYield(id: String | number) {
    const collectionProducts = await this.getCollectionProducts(id, 1)
    for (let i = 0; i < collectionProducts?.TotalPage;) {
      try {
        let res = await this.getCollectionProducts(id, i+1)
        if(res?.Data){
          i++;
          yield {items: res.Data, progreso: i/collectionProducts?.TotalPage};
        }
      } catch (error) {
        console.error(error);
        await (new Promise(c=> setTimeout(c, 250)));
      }
    }
  }

  public async AddProductsInCollectionByFile(id: Number | string, pathFile: string, progreso?: (n:number)=>void ){
    const workbook = XLSX.readFile(pathFile);

    const ids: Parameters<this["AddProductsInCollection"]>[1] = [];

    for (const sheetName in workbook.Sheets) {
      const page1 = XLSX.utils.sheet_to_json(workbook.Sheets[ sheetName ]);
      page1.map((line:any)=>{
        const obj:Parameters<this["AddProductsInCollection"]>[1][0] = {};
        for(const key in line){
          if(key.toLowerCase() === "sku") obj.sku = line[key];
          if(key.toLowerCase() === "productid") obj.productId = line[key];
          if(key.toLowerCase() === "skurefid") obj.skuRefId = line[key];
          if(key.toLowerCase() === "productrefid") obj.productRefId = line[key];
        }
        ids.push(obj)
      })
    }

    var lastProgress = 0;
    const pageSize = 499;
    const pages = Math.ceil(ids.length / pageSize);
    for (let index = 0; index < pages; index++){
      await this.AddProductsInCollection(id, ids.slice(index * pageSize, (index + 1) * pageSize));
      if(progreso){
        const now = Math.floor(Date.now()/1000);
        const isSecond = now != lastProgress;
        lastProgress = now;
        if(isSecond) await progreso(index/pages);
      }
    }
  }

  public async AddProductsInCollection(id: Number | string, Ids: {
    sku?: number,
    productId?: number,
    skuRefId?: number,
    productRefId?: number,
  }[]) {
    const items = Ids.map(({productId, sku, productRefId, skuRefId})=>([sku||"",productId||"",skuRefId||"",productRefId||""]));
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
      try {
        const result = await this.http.post<{
          TotalItemProcessed: number,
          TotalErrorsProcessed: number,
          TotalProductsProcessed: number,
          Errors: any[]
        }>(`api/catalog/pvt/collection/${id}/stockkeepingunit/importinsert`, formData, config);
        if(result.Errors.length > 0)
          throw new ErrorInResponse(JSON.stringify(result.Errors, null, 2));
        if(result.TotalProductsProcessed > 0 || items.length === 0 || result.TotalItemProcessed === items.length) return result;
      } catch (error) {
        if(error instanceof ErrorInResponse) throw error;
        if(error.response?.data) console.error(error.response?.data);
        else console.error(error);
        await new Promise(c=> setTimeout(c,250));
      }
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
    var lastProgress = 0;
    while (true) {
      let finish = false;
      let delayProducts: ICollectionsProductItemResponse[] = [];
      for (let index = 0; delayProducts.length < 440; index++) {
        const {value, done} = await iteratorProducts.next();
        if(done){
          finish = true;
          break;
        }
        if(value && Array.isArray(value.items)){
          if(progreso){
            const now = Math.floor(Date.now()/1000);
            const isSecond = now != lastProgress;
            lastProgress = now;
            if(isSecond) await progreso(value.progreso);
          }
          delayProducts.push(...value.items);
        }
      }
      await this.AddProductsInCollection(newCollecion.Id, delayProducts.map(p=> ({productId: p.ProductId, sku: p.SkuId})));
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
