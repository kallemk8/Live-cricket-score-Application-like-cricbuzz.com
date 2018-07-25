import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../server.service';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newsadd',
  templateUrl: './newsadd.component.html',
  styleUrls: ['./newsadd.component.css']
})
export class NewsaddComponent implements OnInit {
  @ViewChild('f') videoifo : NgForm;
  Selectedfile =null;
  imageurl = "";
  editid = null;
  post = {
    "post_title": "",
    "series":"0",
    "match_id":"",
    "post_content":"",
    "post_excerpt":"",
    "meta_title":"",
    "meta_keywords":"",
    "meta_description":"",
    "post_author":"",
    "post_type": "",
    "post_status":"",
    "postimage":""
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
      this.serverService.getsinglenews(this.editid).subscribe(
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
    
    data.append('post_title', this.post.post_title);
    data.append('series', this.post.series);
    data.append('match_id', this.post.match_id);
    data.append('post_content', this.post.post_content);
    data.append('post_excerpt', "");
    data.append('post_author', "");
    data.append('post_status', "");
    data.append('post_type', "");
    data.append('meta_title','');
    data.append('meta_keywords','');
    data.append('meta_description', '');
    data.append('postimage', this.imageurl);

    if(!this.editid){
     
      this.serverService.onaddnews(data).subscribe(
        (response: Response)=>{
          if(response.status==200){
            this.router.navigate(['/news']);
          }
          console.log(response);
        },(error)=>{
          console.log(error);
        }
      );
    }else{
      data.append('ID',this.editid);
      this.serverService.updatenewsdata(data).subscribe(
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