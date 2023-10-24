import { Component } from '@angular/core';
import { ApiMethodsService } from '../Services/api-methods.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  options:any[]=[];
  roleId:number=0;
  constructor(private router:Router,private api:ApiMethodsService){
    this.roleId=this.api.decodeToken();
    if(this.roleId!=0){
      this.options=this.api.authorizeNavbars(this.roleId);
      // console.log('options',this.options);
    }
  }
  logoutFromApp(){
    localStorage.removeItem('token');
    this.api.successAlert("You logout...!");
    this.router.navigate(['']);

  }
}
