import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../ui/customtoastr.service';
import { UserService } from './models/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomtoastrService, private userAuthService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("İzinsiz Erişim","Yetkiniz Yok",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilemiyor.","Sunucu Hatası",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz İstek Yapıldı.","Geçersiz İstek",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("İstek Bulunumadı.","İstek Bulunumadı.",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata oluştu!","Bilgi",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
      }
      return of(error);
    }));
  }
}


