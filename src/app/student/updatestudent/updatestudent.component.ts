import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent {
  profile:any[]=[];
  userId:number=0;
  status:string='Add';
  constructor(private router: Router, private api: ApiMethodsService) {
   this.userId= this.api.getUserId();
   if(this.userId!=0){
     this.api.getDataFromApi(`https://localhost:7084/api/student/edit/${this.userId}`).subscribe((response:any)=> {
     if(response.data){
      this.status='Update';
      this.profile=response.data;
     }
     else{
      this.status='Add';
     }
     })
   }
   }
  url: string = 'https://localhost:7084/api/author';
  profileData = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    RollNumber: new FormControl('', [Validators.required]),
    Semester: new FormControl(1, [Validators.required]),
    // Email: new FormControl('', [Validators.required,Validators.email]),
    Phone: new FormControl('', [Validators.required,Validators.maxLength(11)]),
    Address: new FormControl('', [Validators.required]),
  });
  getControl(controlName:string) {
    return this.profileData.get(controlName);
  }
  submitData() {
    if (this.profileData.value.Name !== '') {
      var data = {
        Name: this.profileData.value.Name,
        RollNumber: this.profileData.value.RollNumber,
        Semester:this.profileData.value.Semester,
        Email:1,
        Phone:this.profileData.value.Phone,
        Address:this.profileData.value.Address,
        UserId:1
      };
      console.log(data);
      // this.api.postDataUsingApi(this.url, data).subscribe((response: any) => {
      //   console.log(response);
      //   if (response.statuscode === 201) {
      //     this.api.successAlert(response.message);
      //     this.profileData.reset();
      //     this.router.navigate(['home/author/view']);
      //   }
      //   else {
      //     this.api.errorAlert(response.message);
      //   }
      // })
    }
    else {
      this.api.errorAlert('Please fill the forms fields...');
    }

  }

}
