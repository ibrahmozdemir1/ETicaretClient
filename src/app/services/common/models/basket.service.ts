import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateBasketItem } from 'src/app/contracts/basket/Create_Basket_Item';
import { ListBasketItem } from 'src/app/contracts/basket/List_Basket_Item';
import { UpdateBasketItem } from 'src/app/contracts/basket/Update_Basket_Item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService ) { }

  async get() : Promise<ListBasketItem[]> {
    const observable: Observable<ListBasketItem[]> = this.httpClientService.get({
      controller: "basket/",
      action: "GetBasketItems"
    });

    return await firstValueFrom(observable);
  }

  async add(product: CreateBasketItem) : Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "basket",
    },product);

    await firstValueFrom(observable);
  }

  async update(product: UpdateBasketItem) : Promise<void> {
    const observable : Observable<any> = this.httpClientService.put({
      controller: "basket",
    },product);


    await firstValueFrom(observable);
  }

  async delete(basketItemId: string) : Promise<void> {
    const observable : Observable<any> = this.httpClientService.delete({
      action: "basket",
    },basketItemId);

    await firstValueFrom(observable);
  }
}
