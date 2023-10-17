import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  url:string=`https://localhost:7084/api/author`;
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
  author:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.authorData.getDataFromApi(this.url).subscribe((data:any)=>{
      this.author=data;
      console.log(data);
    });
  }

  navigateToSpecificRoute(){
    this.router.navigate(["author/add"]);
  }
}
