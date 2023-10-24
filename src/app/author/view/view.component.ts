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
  roleId:number=0;
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  url:string=`https://localhost:7084/api/author/`;
  authors:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.getAuthors();
    this.roleId=this.authorData.decodeToken();
  }
  getAuthors(){
    this.authorData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.authors=response.data.map((author:any)=> ({
        ...author,
        toggleValue:author.Status===1 ? true: false,
      }));
    });
  }
  toggleChanged(id:number){
    this.authorData.updateDataUsingApi(`https://localhost:7084/api/author/changeStatus/${id}`,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.authorData.successAlert(response.message);
        this.getAuthors();
      }
      else{
        this.authorData.errorAlert(response.message);
      }
    });
    
  }
  goToUpdateView(id:number){
    this.router.navigate(['home/author/update',id]);
  }
  navigateToSpecificRoute(){
    this.router.navigate(["home/author/add"]);
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
