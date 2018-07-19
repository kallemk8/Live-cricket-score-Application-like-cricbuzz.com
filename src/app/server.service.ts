import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ServerService{
    base_url = "http://livevideoshub.com/cricket/api/";
    //base_url = "http://localhost/codeignater/api/";
    constructor(private http: Http){}

    
    onuploadimage(images: any){
        return this.http.post(this.base_url+'uploadfile/', images);
    }
    loginrequest(server:any){
        return this.http.post(this.base_url+'login/', server);
    }
    getvideos(number: any){
        return this.http.get(this.base_url+'videos/', number);
    }
    onaddvideos(videos:any){
        return this.http.post(this.base_url+'videos/', videos);
    }

    
    getsinglevideo(number: any){
        return this.http.get(this.base_url+'getsinglevideo/?number='+number);
    }

    getsinglenews(number: any){
        return this.http.get(this.base_url+'getsinglenews/?number='+number);
    }
    updatevideodata(video: any){
        return this.http.post(this.base_url+'updatevideos/', video);
    }
    deletevideo(id:any){
        return this.http.post(this.base_url+'deletevideo/', id);
    }
    updatenewsdata(video: any){
        return this.http.post(this.base_url+'updatenews/', video);
    }
    deletenews(id:any){
        return this.http.post(this.base_url+'deletenews/', id);
    }
    getphotos(number: any){
        return this.http.get(this.base_url+'photos/?number='+number);
    }
    onaddphotos(videos:any){
        return this.http.post(this.base_url+'addphotos/', videos);
    }

    
    getsinglephoto(number: any){
        return this.http.get(this.base_url+'getsinglephoto/?number='+number);
    }
    updatephotodata(video: any){
        return this.http.post(this.base_url+'updatephoto/', video);
    }
    deletephoto(id:any){
        return this.http.post(this.base_url+'deletephoto/', id);
    }
    getserice(){
        return this.http.get(this.base_url+'serices/');
    }
    getsericeid(number:any){
        return this.http.get(this.base_url+'getsingleserice/?number='+number);
    }
    addserice(data:any){
        return this.http.post(this.base_url+'serices/', data);
    }
    updatesericedata(data:any){
        return this.http.post(this.base_url+'updateserices/', data);
    }
    deleteserice(data:any){
        return this.http.post(this.base_url+'deleteserice/', data);
    }
    getnews(number:any){
        return this.http.get(this.base_url+'news/', number);
    }
    onaddnews(data:any){
        return this.http.post(this.base_url+'news/', data);
    }
    getplayers(number:any){
        return this.http.post(this.base_url+'getplayers/', number)
    }
}