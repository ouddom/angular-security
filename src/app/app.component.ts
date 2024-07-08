import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-security';
  _isLogin:boolean = false;

  visible: boolean = false;


  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.islogin().subscribe(
      (loggedIn) =>{
        this._isLogin = loggedIn;
      })
  }

  logout(){
    this.authService.logout();
  }

  
  showDialog() {
    this.visible = true;
  }
  
}
