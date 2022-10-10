import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketModule } from './baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketModule,
  ]
})
export class ComponentsModule { }
