import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    //LoginModule,
    HomeModule,
    BasketModule,
    RegisterModule
  ]
})
export class ComponentsModule { }
