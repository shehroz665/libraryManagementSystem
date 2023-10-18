import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { faTrash ,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  sizeIcon:SizeProp='1x';
  url:string=`https://localhost:7084/api/author/`;
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
  authors:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.authorData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.authors=response.data;
    });
  }
  goToUpdateView(id:number){
    this.router.navigate(['author/update',id]);
  }
  navigateToSpecificRoute(){
    this.router.navigate(["author/add"]);
  }
}
