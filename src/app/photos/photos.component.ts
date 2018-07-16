import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private serverService: ServerService, private router:Router) { }
  data = [];
  total =[];
  ngOnInit() {
    
    this.serverService.getphotos(JSON.stringify({"number":0})).subscribe(
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
    this.serverService.getphotos(JSON.stringify({"number":number})).subscribe(
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

  deletephoto(number: number){
    this.serverService.deletephoto(JSON.stringify({"number":number})).subscribe(
      (response: Response)=> {
       const videos = response.json(); 
       console.log(videos);
       this.router.navigate(['/photos']);
       
      },(error)=>{
        console.log(error);
      }
    );
  }

}
