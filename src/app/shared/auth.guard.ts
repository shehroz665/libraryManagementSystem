import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiMethodsService } from '../Services/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private api: ApiMethodsService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.api.isLogin()) {
      const userRoleId: number = this.api.decodeToken();
      if (userRoleId === 1 && state.url.includes("profile/edit")) {
        this.router.navigate(['**']);
        return false;
      }
      else if(userRoleId!=1 && (state.url.includes("add") || state.url.includes("update") || state.url.includes("author/view") || state.url.includes("category/view") )){
        this.router.navigate(['**']);
        return false;
      } 
      else {
        return true;
      }
    } else {
      this.router.navigate(['**']);
      return false;
    }
  }
}
