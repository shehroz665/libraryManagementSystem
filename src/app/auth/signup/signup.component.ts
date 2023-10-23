import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  roles:any[]= [
    {
      RoleId:2,
      RoleName:"Student"
    },
    {
      RoleId:3,
      RoleName:"Teacher"
    },
]
  signupForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    roleId:new FormControl('',[Validators.required])
  })
  constructor(private router:Router,private api:ApiMethodsService){}
  getControl(controlName:string){
    return this.signupForm.get(controlName);
  }
  onSubmit(){
    var signupData=this.signupForm.value;
    const desiredRoleId = Number(this.signupForm.value.roleId);
    const filteredRoleName = this.roles.filter(role => role.RoleId === desiredRoleId);
    var data={
      Email: signupData.email,
      Password: signupData.password,
      userMessage: "",
      userToken: "",
      RoleId:signupData.roleId,
      RoleName:filteredRoleName[0].RoleName
    }
    this.api.login('https://localhost:7084/signUp',data).subscribe((response:any)=> {
      
      if(response.statuscode===201){
        this.api.successAlert(response.message);
        this.router.navigate(['/login']);
      }
      else{
        this.api.errorAlert(response.message);
      }
      
    })
  }
}
