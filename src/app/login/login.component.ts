import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') logininfo: NgForm;
  constructor(private serverservice: ServerService, private router: Router, private usercookie: CookieService) { }
  message ="";
  ngOnInit() {
    var userid = this.usercookie.check('userid');
    if(userid){
      this.router.navigate(['/home']);
    }
  }

  onSubmit(){
    this.serverservice.loginrequest(JSON.stringify(this.logininfo.value)).subscribe(
      (response: Response)=>{
        const data = response.json(); 
        if(data.status){
          this.router.navigate(['/home']);
          console.log(data.data.userdata.username);
          this.usercookie.set('userid',data.data.userdata.username)
        }else{
          this.message="Check Login Details";
        }
      },(error)=>console.log(error)
    );
    console.log(this.logininfo.value);
  }
}
