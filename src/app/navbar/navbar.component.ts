import { Component } from '@angular/core';
import { ApiMethodsService } from '../Services/api-methods.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,private api:ApiMethodsService){}
  logoutFromApp(){
    localStorage.removeItem('token');
    this.api.successAlert("You logout...!");
    this.router.navigate(['']);

  }
}
