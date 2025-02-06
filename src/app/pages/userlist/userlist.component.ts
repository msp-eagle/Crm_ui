import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './User';
import {ApiServiceService} from '../../api-service.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  standalone: false,
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {

  content: User[] = [];
  // currentUserRole: string = 'ROLE_SUPER_ADMIN';
  userId:any;
  // currentUserRole: string = 'ROLE_HEAD_L1';

  constructor(private userService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    // this.currentUserRole = this.userService.getCurrentUserRole();
    // console.log('Current User Role:', this.currentUserRole);
    this.userId = sessionStorage.getItem('userId')
    console.log('user id ',this.userId)
    // Fetch all users
    this.userService.getUsers(this.userId).subscribe(
      (data: User[]) => {
        this.content = data;
        console.log('Fetched Users:', this.content);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  getUsersByRoles(roles: string[]): User[] {
    const users = this.content.filter(user =>
      user.roles.some(userRole => roles.includes(userRole.name))
    );

    console.log(`Users with roles ${roles.join(', ')}:`, users); // Log filtered users
    return users;
  }

  // isAdmin(): boolean {
  //   return this.currentUserRole === 'ROLE_SUPER_ADMIN';
  // }

  // isHead(): boolean {
  //   return this.currentUserRole.startsWith('ROLE_HEAD');
  //
  // }

  delete(userId: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success"
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete user.",
              icon: "error"
            });
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  view(id: any) {
    this.router.navigate([`/home/show-user/${id}`]);
  }



  edit(id: any) {
    this.router.navigate([`/home/update-user/${id}`]);
  }



  // Headview(name:any, id: any) {
  //   console.log(name);
  //   if(name === 'ROLE_HEAD_L1'){
  //     sessionStorage.setItem('userRole', name);
  //     console.log('ROLE_HEAD_L1',name);
  //   }
  //
  //   else if(name === 'ROLE_HEAD_L2'){
  //     sessionStorage.setItem('userRole', name);
  //     console.log('ROLE_HEAD_L2',name);
  //   }
  //   else if(name === 'ROLE_HEAD_L3'){
  //     sessionStorage.setItem('userRole', name);
  //     console.log('ROLE_HEAD_L3',name);
  //   }
  //   this.currentUserRole.includes(name);
  //   this.router.navigate([`/home/member-user`]);
  //
  //   return this.currentUserRole.includes(name);
  // }

  memberView(id:any,role:any) {
    // this.userService.getUsers(id).subscribe(
    //   (data: User[]) => {
        sessionStorage.setItem('memberId',id)
        sessionStorage.setItem('memberRole',role)
        this.router.navigate([`/home/member-user`]);
      //
      // },
      // (error) => {
      //   console.error('Error fetching users:', error);
      // }
    // );
  }

  protected readonly sessionStorage = sessionStorage;
}
