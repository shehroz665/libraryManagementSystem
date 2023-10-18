import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent {
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
    this.router.navigate(['book/update',id]);
  }
  navigateToSpecificRoute(){
    this.router.navigate(["book/add"]);
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
