import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { faTrash ,faPenToSquare,faExpand,faArrowDown,faArrowUp} from '@fortawesome/free-solid-svg-icons';

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
  expandIcon=faExpand;
  upIcon=faArrowUp;
  downIcon=faArrowDown;
  expand:boolean=false;
  url:string=`https://localhost:7084/api/author?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
  authors:any[]=[];
  constructor (private router:Router,private authorData:ApiMethodsService){
    this.getAuthors();
    this.roleId=this.authorData.decodeToken();
  }
  getAuthors(){
    this.authorData.getDataFromApi(this.url).subscribe((response:any)=>{
      this.pageSize=response.data.count;
      console.log(response.data.data);
      
      this.authors=response.data.data.map((author:any)=> ({
        ...author,
        toggleValue:author.Status===1 ? true: false,
        isexpandRow:false,
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
    var deleteUrl=`https://localhost:7084/api/author/delete/${data.AuthId}`;
    console.log(deleteUrl);
    
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
    // console.log(newPage);
    this.to=newPage*10;
    this.from=(this.to-10)+1;
    this.url=`https://localhost:7084/api/author?from=${this.from}&to=${this.to}`;
    this.getAuthors();  
  }
  onSearchChange(){
    this.url=`https://localhost:7084/api/author?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
    this.getAuthors();
  }
}
