import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { IUser } from '../interface/iuser';
import { Router } from '@angular/router';
import { IUserSignUp } from '../interface/iuser-sign-up';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);
  private url:string = 'http://localhost:8081/auth';

  constructor(
    	private http:HttpClient,
      private router:Router,
      private messageService: MessageService
  ){
    if(typeof localStorage !== 'undefined'){
      this.logged.next(!!localStorage.getItem('token'));
    }
  }

  login(credential:IUser){
    this.http.post<any>(`${this.url}/login`, credential).subscribe(
      response => {
        if (response !== null) {
          const token = response.token;
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
          }, 200);
          localStorage.setItem('token', token);
          this.logged.next(true);
          this.router.navigate(['dashboard']);
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed' });
        }
      }
    );
  };

  signup(credential:IUserSignUp){
    this.http.post<any>(`${this.url}/signup`,credential).subscribe(
      response => {
        if(response !== null){
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfully' });
          }, 200);
          let user:IUser = {
            email:credential.email,
            password:credential.password
          }
          setTimeout(() => {
            this.login(user);
          }, 400);
        }
      }
    )
  }


  logout(){
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    setTimeout(()=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout Successfully' });
    },200)
    this.logged.next(false);
    this.router.navigate(['/login']);
  }


  islogin():BehaviorSubject<boolean>{
    return this.logged;;
  }

}
