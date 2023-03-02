import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthserviceService, _isAuthenticated } from 'src/app/services/common/authservice.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customtoastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomtoastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {

    if(!_isAuthenticated){
      this.router.navigate(["login"],{queryParams: {return: state.url}});
      this.toastrService.message("Oturum Açmanız Gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      })
    }

    return true;
  }

}
