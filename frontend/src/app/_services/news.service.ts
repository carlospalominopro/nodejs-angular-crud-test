import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
  ) { }


  getNews(){
    let path = 'http://my-json-server.typicode.com/carlospalominopro/nodejs-angular-crud-test/articles';
    return this.http.get(path)
  }
  
}
