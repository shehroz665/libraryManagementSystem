import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiMethodsService } from '../Services/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private api:ApiMethodsService) {
   
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.api.isLogin()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false; 
    }
  }
}
