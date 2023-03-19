import { query } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private httpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: () => void,errorCallBack?: (errorMessage: string) => void ) {
    this.httpClientService.post({
      controller: "product"
    },product).subscribe(result => {
      successCallBack();
    }, (errorReponse: HttpErrorResponse) => {
      const _error : Array<{key: string , value: Array<string>}> = errorReponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5,successCallBack?: () => void,errorCallBack?: (errorMessage: string) => void) :
  Promise<{totalCount : number; products : List_Product[]}>{
    let _responseModel:{totalCount : number; products : List_Product[]}=null;
    const promiseData= this.httpClientService.get<{totalCount : number; products : List_Product[]}>({
      controller : "product",
      queryString : `page=${page}&size=${size}`
    });

    await lastValueFrom<{products:List_Product[],totalCount:number}>(promiseData)
    .then(data => { _responseModel=data; successCallBack()  })
    .catch((httpErrorResponse: HttpErrorResponse) => {  errorCallBack(httpErrorResponse.error) });


    return  _responseModel;
  }

  async delete(id: string){
    const deleteObs: Observable<any> = this.httpClientService.delete<any>({
      controller: "product",
    }, id)

    await firstValueFrom(deleteObs);
  }

  async readİmages(id: string): Promise<List_Product_Image[]>{
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "product/"
    },id);

    return await firstValueFrom(getObservable);
  }

  async deleteImage(id: string, imageId: string){
    debugger;
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "product/",
      queryString: `imageId=${imageId}`
    }, id);

    await firstValueFrom(deleteObservable);

  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void>{
    const changeShowCaseImageObservable = this.httpClientService.get({
      controller: "product/",
      action: "ChangeShowCaseImage",
      queryString: `ImageId=${imageId}&ProductId=${productId}`,
    });

    await firstValueFrom(changeShowCaseImageObservable);
    successCallBack();
  }
}
