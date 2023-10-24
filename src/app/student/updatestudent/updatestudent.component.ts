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

  constructor(private router: Router, private api: ApiMethodsService) {
     this.api.getDataFromApi(`https://localhost:7084/api/student/edit/${this.userId}`).subscribe((response:any)=> {
     if(response.data){
      this.status='Update';
      const data=response.data;
      this.profileData.setValue({
        Name: data.Name,
        RollNumber: data.RollNumber,
        Semester: data.Semester,
        Phone: data.Phone,
        Address:data.Address
      });
     }
     else{
      this.status='Add';
     }
     })
   }
   userId:number=Number(this.api.getTokenFields('UserId')) || 0;
   userEmail:string=this.api.getTokenFields('UserEmail');
   status:string='Add';
  url: string = 'https://localhost:7084/api/student';
  profileData = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    RollNumber: new FormControl('', [Validators.required]),
    Semester: new FormControl(1, [Validators.required]),
    Phone: new FormControl('', [Validators.required,Validators.maxLength(11)]),
    Address: new FormControl('', [Validators.required]),
  });
  getControl(controlName:string) {
    return this.profileData.get(controlName);
  }
  submitData() {
      var data = {
        Name: this.profileData.value.Name,
        RollNumber: this.profileData.value.RollNumber,
        Semester:Number(this.profileData.value.Semester),
        Email:this.userEmail,
        Phone:this.profileData.value.Phone,
        Address:this.profileData.value.Address,
        UserId:this.userId
      };
      const postOrUpdateStatus:number = this.status==='Add' ? 1 : 2;
      const updatedUrl:string=this.status==='Add' ? this.url : this.url+`/update/${this.userId}`;
      this.api.postOrUpdate(updatedUrl, data,postOrUpdateStatus).subscribe((response: any) => {
        console.log(response);
        if (response.statuscode === 201 || response.statuscode === 200) {
          this.api.successAlert(response.message);
        //  this.profileData.reset();
          // this.router.navigate(['home/student/edit']);
        }
        else {
          this.api.errorAlert(response.message);
        }
      })
    
    

  }

}
