import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addteams',
  templateUrl: './addteams.component.html',
  styleUrls: ['./addteams.component.css']
})
export class AddteamsComponent implements OnInit {
  @ViewChild('f') videoifo : NgForm;
  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "team_name": "",
    "mini_name":"",
    "aboutus":"",
    "CountryId":"1"
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
      this.serverService.getsingleteam(this.editid).subscribe(
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
    data.append('team_name', this.post.team_name);
    data.append('aboutus', this.post.aboutus);
    data.append('CountryId', this.post.CountryId);
   
    data.append('mini_name', this.post.mini_name);
   
    if(!this.editid){
     
      this.serverService.onaddteam(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/teams']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('team_id',this.editid);
      this.serverService.updateteam(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/teams']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
}
