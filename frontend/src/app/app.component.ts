import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public router : Router,
    public authService : AuthenticationService,
  ){
    if(!this.authService.currentUserValue){
      this.router.navigate(['/login'])
    }
  }
}
