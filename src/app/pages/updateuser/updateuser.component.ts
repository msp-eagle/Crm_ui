import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../class/Customer';
import {ApiServiceService} from '../../api-service.service';

@Component({
  selector: 'app-updateuser',
  standalone: false,
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})



export class UpdateuserComponent implements OnInit {
  // customer: Customer = new Customer();
  userForm: FormGroup;
  successMessage : any;
  errorMessage: any;
  id: any;
  ListData: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: ApiServiceService,
    private router: Router
  ) {
    this.userForm = this.fb.group({

      username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        position: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
      country: ['', Validators.required],
        description: ['', Validators.required],

      sendEmail: [false],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getEmployeeById(this.id).subscribe(
      (data: any) => {

     // console.log("Form username",this.userForm.controls['name'].value)
     //    console.log("userData ",data);

        this.userForm?.controls['username']?.setValue(data.username);
        this.userForm?.controls['email']?.setValue(data.email);
        console.log("Form username",this.userForm.controls['name'].value)
        this.userForm?.controls['firstName']?.setValue(data.userProfile.firstName);
        this.userForm?.controls['lastname']?.setValue(data.userProfile.lastName);
        this.userForm?.controls['country']?.setValue(data.userProfile.country);
        this.userForm?.controls['phone']?.setValue(data.userProfile.phone);




      },
      (error: any) => console.log('Error fetching user:', error)
    );
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const roleId = this.userForm.value.roleId;
    const userData = this.userForm.value;

    this.userService.updateCustomer(this.id, userData, roleId).subscribe(
      (response: any) => {
        console.log('Customer updated successfully');
        this.successMessage = response;
        this.router.navigate(['/main/all-users']);
      },
      (error: any) => {
        console.error('Error updating customer:', error);
        this.errorMessage = error.message;
      }
    );
  }
}
