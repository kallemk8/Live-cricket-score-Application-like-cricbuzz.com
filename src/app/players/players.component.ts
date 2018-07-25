import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(private serverService: ServerService, private router:Router) { }
  data = [];
  total =[];
  ngOnInit() {
    
    this.serverService.getplayers(JSON.stringify({"number":0})).subscribe(
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

  deletevideo(number: number){
    this.serverService.deletevideo(JSON.stringify({"number":number})).subscribe(
      (response: Response)=> {
       const videos = response.json(); 
       console.log(videos);
       this.router.navigate(['/videos']);
      },(error)=>{
        console.log(error);
      }
    );
  }
}
