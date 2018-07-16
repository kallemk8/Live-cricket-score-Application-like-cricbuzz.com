import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usercookie: CookieService, private router: Router) { }

  ngOnInit() {
  }
  onLogout(){
    this.usercookie.delete('userid');
    var userid = this.usercookie.check('userid');
    if(!userid){
      this.router.navigate(['/login']);
    }
  }
}
