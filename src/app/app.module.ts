import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterState, Router, RouterModule } from '@angular/router';
import {ServerService} from './server.service';
import {AuthGuard} from './auth-guard.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { VideosComponent } from './videos/videos.component';
import { PhotosComponent } from './photos/photos.component';
import {DataTableModule} from "angular-6-datatable";
import { CreateComponent } from './videos/create/create.component';

import { AddComponent } from './photos/add/add.component';
import { NewsComponent } from './news/news.component';
import { NewsaddComponent } from './news/newsadd/newsadd.component';

const appRoot: Routes = [
  {path: "", component: HomeComponent, canActivate:[AuthGuard]},
  {path: "home", component: HomeComponent, canActivate:[AuthGuard] },
  {path: "login", component: LoginComponent },
  {path: "videos", component: VideosComponent, canActivate:[AuthGuard] },
  {path: "videos/add", component: CreateComponent, canActivate:[AuthGuard] },
  {path: "videos/edit/:id", component: CreateComponent, canActivate:[AuthGuard] },
  {path: "photos", component: PhotosComponent, canActivate:[AuthGuard] },
  {path: "photos/edit/:id", component: AddComponent, canActivate:[AuthGuard] },
  {path: "photos/add", component: AddComponent, canActivate:[AuthGuard] },
  {path: "news", component: NewsComponent, canActivate:[AuthGuard] },
  {path: "news/edit/:id", component: NewsaddComponent, canActivate:[AuthGuard] },
  {path: "news/add", component: NewsaddComponent, canActivate:[AuthGuard] },
  
  {path: "**", component: AppComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    VideosComponent,
    PhotosComponent,
    CreateComponent,
    AddComponent,
    NewsComponent,
    NewsaddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot(appRoot)
  ],
  providers: [ServerService,CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
