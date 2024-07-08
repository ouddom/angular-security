import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.checkIfAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }

    return isAuthenticated;
  }

  private checkIfAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}