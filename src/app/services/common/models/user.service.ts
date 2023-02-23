import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/Token/token';
import { TokenResposen } from 'src/app/contracts/Token/TokenResponse';
import { Create_User } from 'src/app/contracts/User/creat_user';
import { User } from 'src/app/entities/user';
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

    const observable: Observable<any | TokenResposen> = this.httpClientService.post<any | TokenResposen>({
      controller: "Users/",
      action: "login",
    }, {userNameOrEmail, password})

    const tokenRespose: TokenResposen = await firstValueFrom(observable) as TokenResposen;
    if(tokenRespose){

      localStorage.setItem("accessToken", tokenRespose.token.accessToken);

      this.toastrService.message("Kullanıcı Girişi Başarıyla Sağlandı.","Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }
}
