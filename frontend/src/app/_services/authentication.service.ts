import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { User } from '../_models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {

    this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentTokenSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
    this.currentToken = this.currentTokenSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }

  login(user : any) {
      
    var url = environment.apiUrl + '/login';
    return this.httpClient.post(url, user);

  }


  logout() {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(res => {location.reload()});

  }

}
