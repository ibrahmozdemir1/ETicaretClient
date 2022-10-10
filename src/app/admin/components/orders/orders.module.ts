import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "",component : OrdersComponent},
    ])
  ]
})
export class OrdersModule { }
