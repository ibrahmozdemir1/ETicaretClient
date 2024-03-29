import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/Token/token';
import { TokenResponse } from 'src/app/contracts/Token/TokenResponse';
import { Create_User } from 'src/app/contracts/User/creat_user';
import { User } from 'src/app/entities/user';
import { MessageType } from '../../admin/alertify.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../ui/customtoastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomtoastrService) { }

  async create(user: User) : Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "Users"
    },user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void) : Promise<any>{

    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth/",
      action: "login",
    }, {userNameOrEmail, password})

    const tokenRespose: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenRespose){

      localStorage.setItem("accessToken", tokenRespose.token.accessToken);
      localStorage.setItem("refreshToken", tokenRespose.token.refreshToken);

      this.toastrService.message("Kullanıcı Girişi Başarıyla Sağlandı.","Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void) : Promise<any>{

    const observable : Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, { refreshToken: refreshToken })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, func?: () => void) : Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post({
      action:"facebook-login",
      controller: "auth/"
    },user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Giriş Sağlanmıştır.","Başarılı",{
        position: ToastrPosition.TopRight,
        messageType: ToastrMessageType.Success,
      });
    }

    func();
  }

  async googleLogin(user: SocialUser, func?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse >({
      action:"google-login",
      controller: "auth/"
    },user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Giriş Başarıyla sağlanmıştır.","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });

      func();
    }
  }
}
