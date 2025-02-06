import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../api-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';





@Component({
  selector: 'app-login',
  standalone:false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  image:any= [];
  loginform!: FormGroup;
  private loginData: any;
  private user: any;
  private role: any;
constructor( private service: ApiServiceService ,private router:Router,private fb: FormBuilder) {
}


  callApi() {
    if (this.loginform.valid) {

      const data = this.loginform.value;
      console.log('logindata : ', data)

      this.service.login(data).subscribe((response: any) => {


        if (response && response.status === 'success') {
          // Get the login response data
          this.loginData = response.response;
          this.user = {
            userId: this.loginData.userId,
            userEmail: this.loginData.userEmail,
            userName: this.loginData.userName
          };

          // Get the roles (assuming there can be multiple roles, you can loop through if needed)
          if (this.loginData.roles && this.loginData.roles.length > 0) {
            this.role = this.loginData.roles[0]; // You can handle this logic for multiple roles as needed
          }

          console.log('User Data:', this.user);
          console.log('Role:', this.role);
          sessionStorage.setItem('roleName', this.role.name);
          sessionStorage.setItem('roleId',this.role.id);
          sessionStorage.setItem('userId',this.user.userId);
          sessionStorage.setItem('userEmail',this.user.userEmail);
          sessionStorage.setItem('userName',this.user.userName);
          this.router.navigate(['/home/dashboard']);
        } else {
          // Handle failure
          console.log('Login failed or invalid response');
          this.router.navigate(['/login']);
        }



        }
      )
    }
  }

  ngOnInit(): void {
  this.loginform= this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required]]
  })
  }
}
