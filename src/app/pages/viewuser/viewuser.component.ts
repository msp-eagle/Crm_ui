import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ApiServiceService} from '../../api-service.service';

@Component({
  selector: 'app-viewuser',
  standalone: false,
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.css'
})
export class ViewuserComponent implements OnInit {
  id:any;
  customer: any = {};

  constructor(private route: ActivatedRoute, private userService: ApiServiceService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


    // this.customer = new Customer();
    this.userService.getEmployeeById(this.id).subscribe( (data:any )=> {
      this.customer=data;

      console.log(this.customer);
    });
  }
}
