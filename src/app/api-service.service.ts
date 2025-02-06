import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from './class/Customer';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl= "http://localhost:8081/crm";
  url = "http://192.168.1.156:8080/crm/";
  constructor(private http: HttpClient) { }
  getUsers(id:any){
    // const headersRequest = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'Cookie': 'JSESSIONID=7A4C30A651D7C005F169482370C520A5'
    // });
    return this.http.get<any>(this.baseUrl+`/manager/all-users?id=${id}`);
    // return this.http.get<any>(this.baseUrl+'/manager/all-users');
  }


  // getAllUsers(): Observable<any> {
  //   const sessionID = "your-session-id"; // Assign your session ID or any value
  //   document.cookie = `sessionID=${sessionID}; path=/; domain=localhost; secure=true; SameSite=Lax`;
  //   return this.http.get<any>('http://localhost:8080/crm/manager/all-users', { withCredentials: true });
  // }




  createUser(customerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/manager/register-user`, customerData);
  }


  setpass(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/manager/set-password`, data);
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/change-password`, data);
  }
  deleteUser(id: number) {
    return this.http.get<any>(this.baseUrl+`/manager/delete-user/${id}`);
  }

  login(data:any):Observable<any> {
    // const headersRequest = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'Cookie': 'JSESSIONID=F298299F66A4212993F658F430D2200A'
    // });

    return this.http.post<any>(this.baseUrl+'/login',data);
  }


  getEmployeeById(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl+`/manager/show-user/${id}`);
  }




  updateCustomer(id: number, userData: any, roleId: any): Observable<any> {
    const updatePayload = {
      id:id,
      userData:userData,
      roleId:roleId,
    };

    return this.http.post(this.baseUrl+`/manager/update-user`,updatePayload);
  }



  hasRole(role: string) {
    return false;
  }

  getCurrentUserRole() {
    return '';
  }
}
