import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('f') videoifo : NgForm;
  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "customvideolink": "",
    "subTitle":"",
    "videotitle":"",
    "video_type":"1",
    "videoid":"",
    "series":"0",
    "match_id":"",
    "videocontent":"",
    "videoimage":""
  };
  realdata = null;
  videotitle =null;
  serice = null;
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
      const editeddata = JSON.stringify({"number":this.editid})
      this.serverService.getsinglevideo(editeddata).subscribe(
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
    data.append('customvideolink', this.post.customvideolink);
    data.append('subtitle', this.post.subTitle);
    data.append('videotitle', this.post.videotitle);
    data.append('video_type', this.post.video_type);
    data.append('videoid', this.post.videoid);
    data.append('series', this.post.series);
    data.append('match_id', this.post.match_id);
    data.append('videocontent', this.post.videocontent);
    data.append('videoimage', this.imageurl);

    if(!this.editid){
     
      this.serverService.onaddvideos(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/videos']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('ID',this.editid);
      this.serverService.updatevideodata(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/videos']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
}
