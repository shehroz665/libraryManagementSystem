import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  constructor(private router:Router,private api:ApiMethodsService){}
  url:string='https://localhost:7084/api/category';
  categoryFormData=new FormGroup({
    CatName:new FormControl('',[Validators.required])
  });
  get catName(){
    return this.categoryFormData.get('CatName');
  }
  postData(){
  var CatNameField=this.categoryFormData.value.CatName;
   if(CatNameField!==''){
    var data={
      CatName:CatNameField,
      Status:1,
    };
    this.api.postDataUsingApi(this.url,data).subscribe((response:any)=> {
        if(response.statuscode===201){
          this.api.successAlert(response.message);
          this.categoryFormData.reset();
          this.router.navigate(['home/category/view']);
        }
        else{
          this.api.errorAlert(response.message);    
        }
    })
   }
   else{
    this.api.errorAlert('Please fill the forms fields...');
   }
    
  }

}
