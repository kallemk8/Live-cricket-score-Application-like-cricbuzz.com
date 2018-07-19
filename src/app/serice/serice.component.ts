import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-serice',
  templateUrl: './serice.component.html',
  styleUrls: ['./serice.component.css']
})
export class SericeComponent implements OnInit {
  constructor(private serverService: ServerService, private router:Router) { }
  data = [];
  total =[];
  ngOnInit() {
    
    this.serverService.getserice().subscribe(
      (response: Response)=> {
       var videos = response.json(); 
       this.data = videos.data.userdata;
       console.log(this.data);
      
      },(error)=>{
        console.log(error);
      }
    );
  }
  nextpage(number: number){
    var number = number-1;
    number = number*10;
    this.serverService.getplayers(JSON.stringify({"number":number})).subscribe(
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

  deleteserice(number: number){
    this.serverService.deleteserice(JSON.stringify({"number":number})).subscribe(
      (response: Response)=> {
       const videos = response.json(); 
       if(videos.status){

        this.serverService.getserice().subscribe(
          (response: Response)=> {
          var videos = response.json(); 
          this.data = videos.data.userdata;
          console.log(this.data);
          
          },(error)=>{
            console.log(error);
          }
        );
       }
       console.log(videos);
      
      },(error)=>{
        console.log(error);
      }
    );
  }
}

