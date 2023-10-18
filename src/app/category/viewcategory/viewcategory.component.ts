import { Component } from '@angular/core';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { Router } from '@angular/router';
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
  url:string='https://localhost:7084/api/category';
  categories:any[]=[];
  constructor(private router:Router,private apiData:ApiMethodsService){
    this.apiData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.categories=response.data;
      console.log(this.categories);
    })
  }
  navigateToSpecificRoute(){
      this.router.navigate(['category/add']);
  }
}
