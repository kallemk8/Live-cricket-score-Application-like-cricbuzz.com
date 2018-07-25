import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-allmatches',
  templateUrl: './allmatches.component.html',
  styleUrls: ['./allmatches.component.css']
})
export class AllmatchesComponent implements OnInit {

  constructor(private serverService: ServerService, private router:Router) { }
  data = [];
  total =[];
  ngOnInit() {
    
    var number = 0;
    this.serverService.getmatches(number).subscribe(
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

  deletevideo(number: number){
    this.serverService.deletematche(JSON.stringify({"number":number})).subscribe(
      (response: Response)=> {
       const videos = response.json(); 
       console.log(videos);
       this.router.navigate(['/matches']);
      },(error)=>{
        console.log(error);
      }
    );
  }
}
