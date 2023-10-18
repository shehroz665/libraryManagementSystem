import { Component } from '@angular/core';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { Router } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent {
  data:any[]= [
    {
      name: 'Russia',
      area: 17075200,
      population: 146989754,
    },
    {
      name: 'Canada',
      area: 9976140,
      population: 36624199,
    },
    {
      name: 'United States',
      area: 9629091,
      population: 324459463,
    },
    {
      name: 'China',
      area: 9596960,
      population: 1409517397,
    },
    {
      name: 'Russia',
      area: 17075200,
      population: 146989754,
    },
    {
      name: 'Canada',
      area: 9976140,
      population: 36624199,
    },
    {
      name: 'United States',
      area: 9629091,
      population: 324459463,
    },
    {
      name: 'China',
      area: 9596960,
      population: 1409517397,
    },
  ];
  url:string=`https://localhost:7084/api/category`;
  categories:any[]=[];
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  sizeIcon:SizeProp='1x';
  constructor(private router:Router,private apiData:ApiMethodsService){
      this.getCategory();
  }
  getCategory(){
    this.apiData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.categories=response.data;
    });
  }
  goToUpdate(id:number){
    this.router.navigate(['category/update',id]);
  }
  navigateToSpecificRoute(){
      this.router.navigate(['category/add']);
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
