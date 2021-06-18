import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser : Observable<User>;

  constructor(
    public authService : AuthenticationService
  ){
    this.currentUser = this.authService.currentUser
    
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
  }

}
