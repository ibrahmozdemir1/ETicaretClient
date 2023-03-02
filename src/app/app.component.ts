import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from './services/common/authservice.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from './services/ui/customtoastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthserviceService, private toastrService: CustomtoastrService, private router: Router) {
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatıldı!", "Bilgi!", {
      position: ToastrPosition.BottomRight,
      messageType: ToastrMessageType.İnfo
    })
  }
}


$.get("https://localhost:7220/api/product", data => {
  console.log(data)
})
