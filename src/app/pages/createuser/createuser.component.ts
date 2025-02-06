import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {ApiServiceService} from '../../api-service.service';

@Component({
  selector: 'app-createuser',
  standalone: false,
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})

export class CreateuserComponent implements OnInit {
  userForm!: FormGroup;
  isGoogleUser = true;
  hasGoogleGmailAccess = true;
  googleAuthLink = 'https://accounts.google.com';
  gmailAccessLink = 'https://myaccount.google.com';

  constructor(
    private fb: FormBuilder,
    private userService: ApiServiceService,
    private router: Router
  ) {

    // profileForm = new FormGroup({
    //   name: new FormControl(''),
    //   email: new FormControl(''),
    // })
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      position: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required]

    });
  }

  ngOnInit(): void {



  }

  callRegister(){
    const formData = {email: "bixayet944@bmixr.com",status:"active",role:5}
    this.userService.createUser(formData).subscribe((response: any) => {
      console.log('Customer created:');
      this.router.navigate(['/home/dashboard']);
    });


  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.userService.createUser(formData).subscribe(
        (response: any) => {
          console.log('Customer created:', response);
          this.router.navigate(['/home/dashboard']);

        },
        (error: any) => {
          console.error('Error creating customer:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
