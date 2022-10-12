import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductserviceService } from 'src/app/services/common/models/productservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService ,private productservice: ProductserviceService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  create(name : HTMLInputElement,price: HTMLInputElement,stock: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productservice.createProduct(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün Eklendi", {
        dismissOthers: false,
        messageType: MessageType.Success,
        position: MessagePosition.TopRight
      });
    });
  }

}