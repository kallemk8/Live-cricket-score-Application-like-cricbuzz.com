import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "photoname": "",
    "photosfolder":"",
    "photogroupid":"",
    "photocontent":"",
    "series":"0",
    "match_id":"",
    "groupimage":""
  };
  realdata = null;
  videotitle =null;
  serice =null;
  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }
  onFileSelected(event){
    this.Selectedfile= event.target.files[0];
    console.log( this.Selectedfile);
  }
  
  uploadimage(){
    var datas = new FormData();
    datas.append('image', this.Selectedfile, this.Selectedfile.name);
    this.serverService.onuploadimage(datas).subscribe(
      (response: Response)=>{
        const imageurl = response.json();
        const imageurl1 = imageurl.upload_data.full_path;
        this.imageurl =  imageurl1;
        this.imageurl = this.imageurl.replace("C:/xampp/htdocs/codeignater/", "");
      },(error)=>{
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.serverService.getserice().subscribe(
      (response: Response)=>{
        this.realdata = response.json();
        const realdata = this.realdata.data.userdata
        this.serice =realdata;
        
        console.log( this.serice);
      },(error)=>{
        console.log(error);
      }
    );
    this.editid = this.route.snapshot.params['id'];
    if(this.editid){
      
      this.serverService.getsinglephoto(this.editid).subscribe(
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
    data.append('photoname', this.post.photoname);
    data.append('photogroupid', this.post.photogroupid);
    data.append('photosfolder', this.post.photosfolder);
    data.append('series', this.post.series);
    data.append('match_id', this.post.match_id);
    data.append('photocontent', this.post.photocontent);
    
    data.append('groupimage', this.imageurl);

    if(!this.editid){
     
      this.serverService.onaddphotos(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/photos']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('ID',this.editid);
      this.serverService.updatephotodata(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/photos']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }

}
