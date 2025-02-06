import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceService} from '../../api-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-set-password',
  standalone: false,

  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {
  passForm!: FormGroup;
  tokenId: any = '';

  constructor(
    private api: ApiServiceService,
    private router: Router,
    private urlToken: ActivatedRoute, private fb: FormBuilder
  ) {
    this.urlToken.queryParamMap.subscribe(params => {
      this.tokenId = params.get('token'); // Get the token value
      console.log('Token cons:', this.tokenId); // You can use this token as needed
    })
  }


  ngOnInit(): void {
    this.urlToken.queryParamMap.subscribe(params => {
      this.tokenId = params.get('token');
      console.log('Token:', this.tokenId);

      if (!this.tokenId) {
        console.error('Token is missing in the URL!');
      }
    });

    this.passForm = this.fb.group({
      password: ['', [Validators.required]],
      token: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  callApi(): void {
    if (!this.tokenId) {
      console.error('Token is missing. API call aborted.');
      return;
    }

    this.passForm.patchValue({ token: this.tokenId });

    const data = this.passForm.value;
    console.log("Form data to send:", data);

    this.api.setpass(data).subscribe(
      (response) => {
        console.log('Password updated successfully:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error updating password:', error);
      }
    );
  }

}
