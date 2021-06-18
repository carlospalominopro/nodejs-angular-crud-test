import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }


  list(data : Object = {}){
    let path = environment.apiUrl + '/user/list';
    return this.http.post(path, data)
  }
  
  create(data : User){
    let path = environment.apiUrl + '/user/create';
    return this.http.post(path, data)
  }
  
  update(data : User){
    let path = environment.apiUrl + '/user/update';
    return this.http.post(path, data)
  }
  
  delete(data : User){
    let path = environment.apiUrl + '/user/delete/' + data.id;
    return this.http.post(path, data)
  }
  
  changeStatus(data : any){
    let path = environment.apiUrl + '/user/changeStatus';
    return this.http.post(path, data)
  }
  
}
