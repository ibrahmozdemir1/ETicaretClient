import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/User/creat_user';
import { User } from 'src/app/entities/user';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customtoastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService
    ,private toastService: CustomtoastrService, spinner: NgxSpinnerService){
    super(spinner);
  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      username: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      email: ["",[
        Validators.required,
        Validators.email
      ]],
      password: ["",[
        Validators.required
      ]],
      passwordConfirm: ["",[
        Validators.required
      ]]
    },{validators: (group: AbstractControl): ValidationErrors | null => {

      let sifre = group.get("password").value;
      let sifreTekrar = group.get("passwordConfirm").value;

      return sifre == sifreTekrar ? null : {notSame: true};
    }});
  }

  get component(){
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User){
    this.submitted = true;
    if(this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(user);

    if(result.success){
      this.toastService.message(result.message,"Kullanıcı Kaydı Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }else{
      this.toastService.message(result.message,"Kullanıcı Kaydı Başarısız.",{
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }


  }


}
