import { Component, OnInit } from '@angular/core';
import { AlertHelper } from '../_helpers/alert';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  loading : boolean = true;
  news : any[] = [];

  constructor(
    public newsService : NewsService,
    public alertHelper: AlertHelper,
  ) {

  }

  ngOnInit(): void {
    this.getNews()
  }

  getNews(){

    this.news = [];

    this.newsService.getNews().subscribe(
      (res : any)=>{
        this.loading = false;
        this.news = res        
      },
      (err : any)=>{
        this.loading = false;
        this.alertHelper.alert(err?.message);
      },
    )
  }

}
