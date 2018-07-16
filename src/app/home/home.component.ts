import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private serverService: ServerService) { }
  data = [];
  total =[];
  ngOnInit() {
    
    this.serverService.getvideos(JSON.stringify({"number":0})).subscribe(
      (response: Response)=> {
       var videos = response.json(); 
       this.data = videos.data.userdata;
       console.log(this.data);

      const count =  Math.round(videos.count/10);
      for(var i=1; i<count; i++ ){
        this.total.push(i);
      }
       console.log(this.total);
      },(error)=>{
        console.log(error);
      }
    );
  }
  nextpage(number: number){
    var number = number-1;
    number = number*10;
    this.serverService.getvideos(JSON.stringify({"number":number})).subscribe(
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
