import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiMethodsService } from './api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router,private api:ApiMethodsService) {
  }
  canActivate(
  ){
    if (this.api.isLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
