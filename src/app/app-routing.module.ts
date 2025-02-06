import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports/reports.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {UserlistComponent} from './pages/userlist/userlist.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewuserComponent} from './pages/viewuser/viewuser.component';
import {MemberListComponent} from './pages/member-list/member-list.component';
import {UpdateuserComponent} from './pages/updateuser/updateuser.component';
import {CreateuserComponent} from './pages/createuser/createuser.component';
import {SetPasswordComponent} from './pages/set-password/set-password.component';
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'set-password', component: SetPasswordComponent},
  {path: 'forgot-password', component: ForgetPasswordComponent},
  { path: 'home',component:HomeComponent,
    children: [
      { path: 'reports',component:ReportsComponent },
      { path: 'all-users',component:UserlistComponent },
      { path: 'show-user/:id',component:ViewuserComponent },
      { path: 'member-user',component:MemberListComponent },
      // { path: 'member-user',component:MemberListComponent },
      { path: 'update-user/:id',component:UpdateuserComponent },
      { path: 'dashboard',component:DashboardComponent },
      { path: 'create-user',component:CreateuserComponent },
      // { path: 'viewTickets',component:ViewTicketsComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
