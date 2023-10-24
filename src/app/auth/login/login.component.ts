import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private router:Router,private api:ApiMethodsService){}
  getControl(controlName:string){
    return this.loginForm.get(controlName);
  }
  onSubmit(){
    var loginData=this.loginForm.value;
    var data={
      email: loginData.email,
      password: loginData.password,
      userMessage: "",
      userToken: "",
      roleId: 0,
      roleName: ""
    }
    this.api.login('https://localhost:7084/login',data).subscribe((response:any)=> {
      
      if(response.statuscode===200){
        localStorage.setItem('token',response.data.UserToken);
        this.api.successAlert(response.message);
        if(response.data.RoleId===1){
          this.router.navigate(['home/author/view']);
        }
        else{
          this.router.navigate(['home/book/view']);
        }
      }
      else{
        this.api.errorAlert(response.message);
      }
      
    })
  }
}
