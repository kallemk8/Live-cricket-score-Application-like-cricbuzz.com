import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ServerService{
    base_url = "http://localhost/codeignater/Apis/";
    constructor(private http: Http){}
    loginrequest(server:any){
        return this.http.post(this.base_url+'login/', server);
    }
    getvideos(number: any){
        return this.http.post(this.base_url+'getvideos/', number);
    }
    onaddvideos(videos:any){
        return this.http.post(this.base_url+'addvideos/', videos);
    }

    onuploadimage(images: any){
        return this.http.post('http://localhost/codeignater/Apis/uploadfile/', images);
    }
    getsinglevideo(number: any){
        return this.http.post(this.base_url+'getsinglevideo/', number);
    }
    updatevideodata(video: any){
        return this.http.post(this.base_url+'updatevideo/', video);
    }
    deletevideo(id:any){
        return this.http.post(this.base_url+'deletevideo/', id);
    }

    getphotos(number: any){
        return this.http.post(this.base_url+'getphoto/', number);
    }
    onaddphotos(videos:any){
        return this.http.post(this.base_url+'addphotos/', videos);
    }

    
    getsinglephoto(number: any){
        return this.http.post(this.base_url+'getsinglephoto/', number);
    }
    updatephotodata(video: any){
        return this.http.post(this.base_url+'updatephoto/', video);
    }
    deletephoto(id:any){
        return this.http.post(this.base_url+'deletephoto/', id);
    }
    getserice(){
        return this.http.get(this.base_url+'getserices/');
    }

    getnews(number:any){
        return this.http.post(this.base_url+'getnews/', number)
    }
}