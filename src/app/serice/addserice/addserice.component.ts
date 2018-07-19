import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addserice',
  templateUrl: './addserice.component.html',
  styleUrls: ['./addserice.component.css']
})
export class AddsericeComponent implements OnInit {

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }
  editid = null;
  realdata = null;
  post = {
    "seriesname": "",
    "ODIs":"",
    "Tests":"",
    "twentytwenty":"",
    "seriescontent":"",
    "team_one_name":"",
    "team_two_name":"",
    "seriesstatus":"",
    
    'teamonemembers':"",
    'teamtwomembers':"",
    'startseries':"",
    'endseries':""
  };
  ngOnInit() {
    this.editid = this.route.snapshot.params['id'];
    if(this.editid){
      var data = new FormData();
      data.append('number', this.editid);
      
      this.serverService.getsericeid(this.editid).subscribe(
        (response: Response)=>{
          this.realdata = response.json();
          console.log(this.realdata);
          const realdata = this.realdata.data.userdata;

          this.post =realdata;
         
          console.log(this.post);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
  
  onSubmit(){
    var data = new FormData();
    data.append('seriesname', this.post.seriesname);
    data.append('ODIs', this.post.ODIs);
    data.append('Tests', this.post.Tests);
    data.append('twentytwenty', this.post.twentytwenty);
    data.append('seriescontent', this.post.seriescontent);
    data.append('team_one_name', this.post.team_one_name);
    data.append('team_two_name', this.post.team_two_name);
    data.append('seriesstatus', this.post.seriesstatus);
    data.append('teamonemembers', this.post.teamonemembers);
    data.append('teamtwomembers', this.post.teamtwomembers);
    data.append('startseries', this.post.startseries);
    data.append('endseries', this.post.endseries);



    if(!this.editid){
     
      this.serverService.addserice(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/serices']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('ID',this.editid);
      this.serverService.updatesericedata(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/serices']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
}
