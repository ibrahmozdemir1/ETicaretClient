import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthserviceService } from 'src/app/services/common/authservice.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit{

  constructor(private userService: UserService,  spinner: NgxSpinnerService, private authService: AuthserviceService,
    private activatedRoot: ActivatedRoute, private router: Router) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  async login(userNameOrEmail: string,password: string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(userNameOrEmail,password, () => {
      this.authService.identityCheck();

      this.activatedRoot.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];

        if(returnUrl){
          this.router.navigate([returnUrl])
        }
      });

      this.hideSpinner(SpinnerType.BallAtom);
    });
  }

}
