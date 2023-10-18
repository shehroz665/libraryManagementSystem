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
  authors:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.getAuthors();
  }
  getAuthors(){
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
  deleteAuthor(data:any){
    var deleteUrl=this.url+`delete/${data.AuthId}`;
    this.authorData.updateDataUsingApi(deleteUrl,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.authorData.successAlert(response.message);
        this.getAuthors();
      }
      else{
        this.authorData.errorAlert(response.message);
      }
    });
  }
}
