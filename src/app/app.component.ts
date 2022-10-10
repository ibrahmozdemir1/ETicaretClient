import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from './services/ui/customtoastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrservice: CustomtoastrService) {
    toastrservice.message('Merhaba!', 'G fun!', {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.BottomCenter,
    });
  }
}


$.get("https://localhost:7220/api/product", data => {
  console.log(data)
})
