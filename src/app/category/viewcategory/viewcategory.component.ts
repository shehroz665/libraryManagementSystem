import { Component } from '@angular/core';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { Router } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent {
  roleId:number=0;
  url:string=`https://localhost:7084/api/category`;
  token:any=localStorage.getItem("token");
  categories:any[]=[];
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  sizeIcon:SizeProp='1x';
  constructor(private router:Router,private apiData:ApiMethodsService){
      this.getCategory();
      this.roleId=this.apiData.decodeToken();
  }
  getCategory(){
    this.apiData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.categories=response.data.map((category:any)=>({
        ...category,
        toggleValue:category.Status===1 ? true : false
      }));
    });
  }
  toggleChanged(id:number){
    this.apiData.updateDataUsingApi(`https://localhost:7084/api/category/changeStatus/${id}`,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.apiData.successAlert(response.message);
        this.getCategory();
      }
      else{
        this.apiData.errorAlert(response.message);
      }
    });
    
  }
  goToUpdate(id:number){
    this.router.navigate(['home/category/update',id]);
  }
  navigateToSpecificRoute(){
      this.router.navigate(['home/category/add']);
  }
  deleteCategory(obj:any){
    var deleteUrl=`https://localhost:7084/api/category/delete/${obj.CatId}`;

    this.apiData.updateDataUsingApi(deleteUrl,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.apiData.successAlert(response.message);
        this.getCategory();
      }
      else{
        this.apiData.errorAlert(response.message);
      }
    })
  }
}
