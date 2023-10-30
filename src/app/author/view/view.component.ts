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
  searchTerm:string='';
  page:number=1;
  pageSize :number=10;
  from: number = 1;
  to: number = 10;
  roleId:number=0;
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  url:string=`https://localhost:7084/api/author?from=${this.from}&to=${this.to}`;
  authors:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.getAuthors();
    this.roleId=this.authorData.decodeToken();
  }
  getAuthors(){
    this.authorData.getDataFromApi(this.url).subscribe((response:any)=>{
      console.log(response);
      this.pageSize=response.data.count;
      this.authors=response.data.data.map((author:any)=> ({
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
  pageChange(newPage:number){
    console.log(newPage);
    this.to=newPage*10;
    this.from=(this.to-10)+1;
    this.url=`https://localhost:7084/api/author?from=${this.from}&to=${this.to}`;
    this.getAuthors();  
  }
  onSearchChange(){
    console.log(this.searchTerm);
    
  }
}
