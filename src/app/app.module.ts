import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import {AccountcreationComponent} from './pages/accountcreation/accountcreation.component';
import {CreateuserComponent} from './pages/createuser/createuser.component';
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
import {HeadListComponent} from './pages/head-list/head-list.component';
import {LoginComponent} from './pages/login/login.component';
import {MemberListComponent} from './pages/member-list/member-list.component';
import {UpdateuserComponent} from './pages/updateuser/updateuser.component';
import {UserlistComponent} from './pages/userlist/userlist.component';
import {ViewuserComponent} from './pages/viewuser/viewuser.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    HomeComponent,
    AccountcreationComponent,
    CreateuserComponent,
    ForgetPasswordComponent,
    HeadListComponent,
    LoginComponent,
    MemberListComponent,
    UpdateuserComponent,
    UserlistComponent,
    ViewuserComponent,
    DashboardComponent,
    SetPasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
