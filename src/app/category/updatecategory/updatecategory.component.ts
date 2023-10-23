import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent {
  id:number=0;
  url:string='https://localhost:7084/api/category';
  categoryFormData=new FormGroup({
    CatName:new FormControl('',[Validators.required])
  });
  constructor(private router:Router,private api:ApiMethodsService,private routeWithId:ActivatedRoute ){
    this.routeWithId.params.subscribe((param)=> {
      this.id=param['id'];
    })
    if(this.id!=0){
      this.api.getDataFromApi(this.url+`/${this.id}`)
      .subscribe((response:any)=> {
        this.categoryFormData.patchValue({
          CatName:response.data.CatName,
        });
      }
      
      )
    }
  }
  get catName(){
    return this.categoryFormData.get('CatName');
  }
  updateData(){
  var CatNameField=this.categoryFormData.value.CatName;
   if(CatNameField!==''){
    var data={
      CatName:CatNameField,
      Status:1,
    };
    this.api.updateDataUsingApi(this.url+`/update/${this.id}`,data).subscribe((response:any)=> {
        if(response.statuscode===200){
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
