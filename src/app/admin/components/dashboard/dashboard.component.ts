import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  alertify: any;

  constructor(spinner: NgxSpinnerService) { 
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);
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