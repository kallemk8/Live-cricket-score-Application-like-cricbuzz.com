import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmatch',
  templateUrl: './addmatch.component.html',
  styleUrls: ['./addmatch.component.css']
})
export class AddmatchComponent implements OnInit {
  @ViewChild('f') videoifo : NgForm;
  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "match_title": "",
    "match_content": "",
    "match_series": "",
    "match_venue": "",
    "team_name_1":"",
    "team_name_2":"",
    "toss":"",
    "matchdate":"",
    "match_status":"",
    "result":"",
    "man_of_the_match":"",
    "man_of_the_series":"",
    "team_one_players":"",
    "team_two_players":"",
    "match_inning":"",
    
    "match_type":"",
    "important":"",
    "ordertoshow":"",
    "session_text":"1"
  };
  realdata = null;
  videotitle =null;
  serice = null;
  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }
  onFileSelected(event){
    this.Selectedfile= event.target.files[0];
    console.log( this.Selectedfile);
  }
  
  ngOnInit() {
    
    this.editid = this.route.snapshot.params['id'];
    if(this.editid){
      this.serverService.getsinglematch(this.editid).subscribe(
        (response: Response)=>{
          this.realdata = response.json();
          const realdata = this.realdata.data.userdata
          this.post =realdata;
          this.imageurl = realdata.videoimage;
          console.log( this.post);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }

  
  
  onSubmit(){
    var data = new FormData();
    
    data.append('match_title', this.post.match_title);
    data.append('match_content', this.post.match_content);
    data.append('match_series', this.post.match_series);
   
    data.append('match_venue', this.post.match_venue);
    data.append('team_name_1', this.post.team_name_1);
    data.append('team_name_2', this.post.team_name_2);
    data.append('toss', this.post.toss);
    data.append('matchdate', this.post.matchdate);
    data.append('match_status', this.post.match_status);
    data.append('result', this.post.result);
    data.append('man_of_the_match', this.post.man_of_the_match);
    data.append('man_of_the_series', this.post.man_of_the_series);
    data.append('team_one_players', this.post.team_one_players);
    data.append('team_two_players', this.post.team_two_players);
    data.append('match_inning', this.post.match_inning);
    data.append('match_type', this.post.match_type);
    data.append('important', this.post.important);
    data.append('ordertoshow', this.post.ordertoshow);
    data.append('session_text', this.post.session_text);

    
    if(!this.editid){
     
      this.serverService.onaddmatches(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/matches']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('ID',this.editid);
      this.serverService.updatematche(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/matches']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
}
