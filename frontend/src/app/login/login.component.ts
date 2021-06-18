import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertHelper } from '../_helpers/alert';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup;

  public loading = false
  public submitted = false
  public loadingImage = true

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthenticationService,
    public alertHelper : AlertHelper,
  ){

    if(this.authService.currentUserValue){

      if(this.authService.currentUserValue.roleId == 1){
        this._router.navigate(['/users'])
      }
      if(this.authService.currentUserValue.roleId == 2){
        this._router.navigate(['/news'])
      }

    }

    this.loginForm = this._formBuilder.group({
      username : ['', [Validators.required, Validators.maxLength(60)]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {

  }

  loginSubmit(formData : any){

    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.loading = true

    this.authService.login(formData)
      .subscribe(
        async(res: any) => { 
                                
          localStorage.setItem('token', res.token);
          this.authService.currentTokenSubject.next(res.token);
          
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.authService.currentUserSubject.next(res.user);

          this.loading = false
          this.submitted = false

          var route = '';

          if(this.authService.currentUserValue.roleId == 1){
            route = '/users'
          }
          if(this.authService.currentUserValue.roleId == 2){
            route = '/news'
          }

          this._router.navigate([route])

        },
        (errors: any) => {            
          
          this.loading = false
          this.submitted = false

          if(errors.status == 0){
            this.alertHelper.alert('Backend se encuentra inactivo')
          }
          else{
            this.alertHelper.alert(errors?.error?.message)
          }
          

        });
  }  

}
