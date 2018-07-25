
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addcountry',
  templateUrl: './addcountry.component.html',
  styleUrls: ['./addcountry.component.css']
})
export class AddcountryComponent implements OnInit {
  @ViewChild('f') videoifo : NgForm;
  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "CountryName": "",
    "Countryrank":"",
    "aboutus":"",
    "team_11":"1"
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
      this.serverService.getsinglecountry(this.editid).subscribe(
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
    data.append('CountryName', this.post.CountryName);
    
    data.append('Countryrank', this.post.Countryrank);
    data.append('aboutus', this.post.aboutus);
    data.append('team_11', this.post.team_11);
   
    if(!this.editid){
     
      this.serverService.onaddcountry(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/country']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('CountryId',this.editid);
      this.serverService.updatecountry(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/country']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
}

