import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor (private router:Router){}
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
  navigateToSpecificRoute(){
    this.router.navigate(["author/add"]);
  }
}
