import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../api-service.service';

@Component({
  selector: 'app-forget-password',
  standalone: false,

  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{
  forgotPassForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private ApiService: ApiServiceService) {}

  submit(){
    const data:any= this.forgotPassForm.value
    console.log(data)
    this.ApiService.forgotPassword(data).subscribe((response:any) => {
      if (response && response.status === 'success') {




        console.log('status:', response.status);
        console.log('res:', response.response);

        this.router.navigate(['/login']);
      } else {
        // Handle failure
        console.log('Login failed or invalid response');
        this.router.navigate(['/login']);
      }
    })
  }
  ngOnInit(): void {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })

  }

}
