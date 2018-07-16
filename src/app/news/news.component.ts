import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  data = null;
  total =[];
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    var number = number-1;
    number = number*10;
    this.serverService.getnews(JSON.stringify({"number":0})).subscribe(
      (response: Response)=> {
        const videos = response.json(); 
        const videos2 = videos.data.userdata;
        this.data =videos2;
        const count =  Math.round(videos.count/10);
      for(var i=1; i<count; i++ ){
        this.total.push(i);
      }
        console.log(videos);
       },(error)=>{
         console.log(error);
       }
    );
  }
  nextpage(number: number){
    var number = number-1;
    number = number*10;
    this.serverService.getnews(JSON.stringify({"number":number})).subscribe(
      (response: Response)=> {
       var videos = response.json(); 
       this.data = videos.data.userdata;
       const count =  Math.round(videos.count/10);
       console.log(this.data);
      },(error)=>{
        console.log(error);
      }
    );
    
  }
}
