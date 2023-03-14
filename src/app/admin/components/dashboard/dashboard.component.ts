import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { Receviefunctions } from 'src/app/constants/receviefunctions';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  alertify: any;

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, private signalRService: SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHubUrl);
  }

  ngOnInit(): void {
    this.signalRService.on(Receviefunctions.ProductAddedMessageFunction, message => {
      alert(message);
    })
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
