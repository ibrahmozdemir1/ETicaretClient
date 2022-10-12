import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  alertify: any;

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);

    this.httpClientService.get<[]>({
      controller: "product"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "product"},
    //   {
    //     name : "Kalem",
    //     price: 15,
    //     stock: 100}
    // ).subscribe();

    // this.httpClientService.put({
    //   controller : "product"
    // },{
    //   id : "7a8792f6-1508-4a4a-91e3-f19dfd9c30c4",
    //   name : "Kağıt",
    //   stock : 1500,
    //   price : 3.5
    // }).subscribe()

    // this.httpClientService.delete({
    //   controller: "product"
    // }, "7a8792f6-1508-4a4a-91e3-f19dfd9c30c4").subscribe()

    this.httpClientService.get({
      fullEndPoint : "https://jsonplaceholder.typicode.com/posts"
    }).subscribe(data => console.log(data));
  }

  m(){
    this.alertify.message("merhaba",{
      messageType: MessageType.Success,
      delay: 5,
      position: MessagePosition.BottomCenter
    });
  }

  d(){
    this.alertify.dissmiss();
  }

}
