import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ServerService{
    //base_url = "http://livevideoshub.com/cricket/api/";
    base_url = "http://localhost/codeignater/api/";
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
    getteams(){
        return this.http.get(this.base_url+'teams/');
    }
    getcountry(){
        return this.http.get(this.base_url+'country/');
    }
    onaddcountry(data:any){
        return this.http.post(this.base_url+'country/', data);
    }
    onaddvideos(videos:any){
        return this.http.post(this.base_url+'videos/', videos);
    }
    onaddteam(data:any){
        return this.http.post(this.base_url+'teams/', data);
    }

    onaddmatches(data:any){
        return this.http.post(this.base_url+'matches/', data);
    }

    
    getsinglevideo(number: any){
        return this.http.get(this.base_url+'getsinglevideo/?number='+number);
    }

    getsinglecountry(number: any){
        return this.http.get(this.base_url+'getsinglecountry/?number='+number);
    }

    
    getsinglematch(number: any){
        return this.http.get(this.base_url+'getsinglematch/?number='+number);
    }
    
    getsingleteam(number: any){
        return this.http.get(this.base_url+'getsingleteam/?number='+number);
    }
    
    getsinglenews(number: any){
        return this.http.get(this.base_url+'getsinglenews/?number='+number);
    }
    updatevideodata(video: any){
        return this.http.post(this.base_url+'updatevideos/', video);
    }

    updatecountry(data: any){
        return this.http.post(this.base_url+'updatecountry/', data);
    }
    updateteam(video: any){
        return this.http.post(this.base_url+'updateteams/', video);
    }

    updatematche(data: any){
        return this.http.post(this.base_url+'updatematche/', data);
    }
    deletecountry(data: any){
        return this.http.post(this.base_url+'deletecountry/', data);
    }
    
    deletevideo(id:any){
        return this.http.post(this.base_url+'deletevideo/', id);
    }
    deletematche(id:any){
        return this.http.post(this.base_url+'deletematche/', id);
    }
    deleteteam(id:any){
        return this.http.post(this.base_url+'deleteteam/', id);
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

    getmatches(number: any){
        return this.http.get(this.base_url+'matches/?number='+number);
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