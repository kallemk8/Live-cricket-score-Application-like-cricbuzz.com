import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private usercookie: CookieService, private route: ActivatedRoute, private router: Router){}
  canActivate() {
    var userid = this.usercookie.check('userid');
    if(userid){
        return true;
    }else{
        this.router.navigate(['/login']);
        return false;
    }
    
  }

  canActivateChild() {
      var userid = this.usercookie.check('userid');
    if(userid){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}