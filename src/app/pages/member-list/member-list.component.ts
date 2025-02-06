import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../userlist/User';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../api-service.service';
declare var $: any;

@Component({
  selector: 'app-member-list',
  standalone: false,

  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit,AfterViewInit {
  headId: number | null = null;
  members: User[] = [];
  currentUserRole: any;
  UserId:any;
  @ViewChild('example', {static: false}) table!: ElementRef;
  private memberId: any;
  private memberRole: any;


  constructor(private route: ActivatedRoute, private userService: ApiServiceService, private router: Router) {
    this.currentUserRole = sessionStorage.getItem('roleName');
  }

  ngOnInit(): void {
    // this.headId = +this.route.snapshot.paramMap.get('headId')!;
    this.memberId = sessionStorage.getItem('memberId');
    this.memberRole = sessionStorage.getItem('memberRole');
    this.userService.getUsers(this.memberId).subscribe(
      (data: any) => {
        this.members = data;
        console.log(this.members);
        if (this.memberRole === 'ROLE_HEAD_L1') {
          const filteredMembers1 = this.members.filter((member: User) => {

            return member.roles?.some((role: any) => role.name === 'ROLE_MEMBER_L1');
          });
          this.members = filteredMembers1;
          console.log(this.members);
          console.log(filteredMembers1);
        } else if (this.memberRole === 'ROLE_HEAD_L2') {
          const filteredMembers1 = this.members.filter((member: User) => {

            return member.roles?.some((role: any) => role.name === 'ROLE_MEMBER_L2');
          });
          this.members = filteredMembers1;
          console.log(this.members);
          console.log(filteredMembers1);
        } else if (this.memberRole === 'ROLE_HEAD_L3') {
          const filteredMembers1 = this.members.filter((member: User) => {

            return member.roles?.some((role: any) => role.name === 'ROLE_MEMBER_L3');
          });
          this.members = filteredMembers1;
          console.log(this.members);
          console.log(filteredMembers1);
        }


      },
      (error: any) => {
        console.error('Error fetching members:', error);
      }
    );
  }


  view(id: any) {
    this.router.navigate([`/home/show-user/${id}`]);
  }


  edit(id: any) {
    this.router.navigate([`/home/update-user/${id}`]);
  }

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

  ngAfterViewInit() {
    this.initializeDataTable();
  }

  initializeDataTable(): void {

      $('#example').DataTable({
        paging: true,
        ordering: true,
        searching: true,
        pageLength: 15,
        lengthMenu: [1, 10, 15, 20]

    });
  }
  }
