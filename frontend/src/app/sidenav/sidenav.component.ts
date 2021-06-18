import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  currentUser : Observable<User>;

  constructor(
    public authService : AuthenticationService
  ){
    this.currentUser = this.authService.currentUser    
  }

  ngOnInit(): void {
  }

}
