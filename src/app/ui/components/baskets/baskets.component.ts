import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/List_Basket_Item';
import { UpdateBasketItem } from 'src/app/contracts/basket/Update_Basket_Item';
import { BasketService } from 'src/app/services/common/models/basket.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner);
  }

  basketItems: ListBasketItem[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.basketItems = await this.basketService.get();
  }

  async changeQuantity(object: any) : Promise<any> {
    const basketItemId = object.target.attributes["id"].value;

    const quantity: number = object.target.value;

    const basketItem: UpdateBasketItem = new UpdateBasketItem();

    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;

    await this.basketService.update(basketItem);
  }


}
