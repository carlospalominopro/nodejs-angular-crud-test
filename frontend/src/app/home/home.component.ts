import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser : Observable<User>;

  constructor(
    public authService : AuthenticationService
  ){
    this.currentUser = this.authService.currentUser
  }

  ngOnInit(): void {
  }

}
