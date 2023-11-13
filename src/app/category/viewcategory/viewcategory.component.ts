import { Component } from '@angular/core';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { Router } from '@angular/router';
import { faPenToSquare, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent {
  upIcon = faChevronUp;
  downIcon = faChevronDown;
  searchTerm: string = '';
  pageSize: number = 0;
  from: number = 1;
  to: number = 10;
  collectionSize: number = 0;
  roleId: number = 0;
  bookDetail: any = [];
  url: string = `https://localhost:7084/api/category/getAllCat?from=${this.from}&to=${this.to}`;
  token: any = localStorage.getItem("token");
  categories: any[] = [];
  updateIcon = faPenToSquare;
  trashIcon = faTrash;
  bookStatusBucket: number[] = [];
  categoryDeleteBucket:number[]=[];
  categoryStatusBucket:number[]=[];
  changeOccured:boolean=false;
  sizeIcon: SizeProp = '1x';
  showCatId:number[]=[];
  constructor(private router: Router, private apiData: ApiMethodsService) {
    this.getCategory();
    this.roleId = this.apiData.decodeToken();
  }
  getCategory() {
    this.apiData.getDataFromApi(this.url).subscribe((response: any) => {
      this.collectionSize = response.data.count;
      this.categories = response.data.data.map((category: any) => ({
        ...category,
        isexpandRow: false,
        toggleValue: category.Status === 1 ? true : false
      }));
    });
  }
  toggleChanged(id: number) {
    this.categoryStatusBucket.push(id);
    // this.apiData.updateDataUsingApi(`https://localhost:7084/api/category/changeStatus/${id}`, {}).subscribe((response: any) => {
    //   if (response.statuscode === 200) {
    //     this.apiData.successAlert(response.message);
    //     this.getCategory();
    //   }
    //   else {
    //     this.apiData.errorAlert(response.message);
    //   }
    // });

  }
  goToUpdate(id: number) {
    this.router.navigate(['home/category/update', id]);
  }
  navigateToSpecificRoute() {
    this.router.navigate(['home/category/add']);
  }
  deleteCategory(obj: any) {
    this.categoryDeleteBucket.push(obj.CatId);
    // var deleteUrl = `https://localhost:7084/api/category/delete/${obj.CatId}`;

    // this.apiData.updateDataUsingApi(deleteUrl, {}).subscribe((response: any) => {
    //   if (response.statuscode === 200) {
    //     this.apiData.successAlert(response.message);
    //     this.getCategory();
    //   }
    //   else {
    //     this.apiData.errorAlert(response.message);
    //   }
    // })
  }
  pageChange(newPage: number) {
    this.to = newPage * 10;
    this.from = (this.to - 10) + 1;
    this.url = `https://localhost:7084/api/category/getAllCat?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
    this.getCategory();
  }
  onSearchChange() {
    this.url = `https://localhost:7084/api/category/getAllCat?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
    this.getCategory();
  }
  toggleExpandRow(category: any): void {
    category.isexpandRow = !category.isexpandRow;
    
    this.apiData.getDataFromApi(`https://localhost:7084/api/category/getAllCat/${category.CatId}`).subscribe((response: any) => {
      this.bookDetail = response.data.data[0].Books;
    })
  }
  toggleBookChanged(book: any) {
    this.bookStatusBucket.push(book.BookId)
  }
  saveChanges() {
    if (this.bookStatusBucket.length != 0) {
      this.bookStatusBucket = Array.from(new Set(this.bookStatusBucket));
      this.bookStatusBucket.forEach(id => {
        this.apiData.updateDataUsingApi(`https://localhost:7084/api/books/changeStatus/${id}`, {}).subscribe((response: any) => {
          if (response.statuscode === 200) {
            // this.apiData.successAlert(response.message);
            const updatedBookIndex = this.bookDetail.findIndex((book: any) => book.BookId === id);
            if (updatedBookIndex !== -1) {
              this.bookDetail[updatedBookIndex].Status = response.data.Status;
              this.changeOccured=true;
            }
          }
          else {
            this.apiData.errorAlert(response.message);
          }
        });

      });
       this.bookStatusBucket = [];
    }
    if(this.categoryStatusBucket.length!=0){
      this.categoryStatusBucket=Array.from(new Set(this.categoryStatusBucket));
      this.categoryStatusBucket.forEach(id => {
        this.apiData.updateDataUsingApi(`https://localhost:7084/api/category/changeStatus/${id}`, {}).subscribe((response: any) => {
          if (response.statuscode === 200) {
            // this.apiData.successAlert(response.message);
            this.changeOccured=true;
            this.getCategory();
          }
          else {
            this.apiData.errorAlert(response.message);
          }
        });
      });
      this.categoryStatusBucket=[];
     

    }
    if(this.categoryDeleteBucket.length!=0){
      this.categoryDeleteBucket= Array.from(new Set(this.categoryDeleteBucket));
      this.categoryDeleteBucket.forEach((id)=> {
       var deleteUrl = `https://localhost:7084/api/category/delete/${id}`;
       this.apiData.updateDataUsingApi(deleteUrl, {}).subscribe((response: any) => {
        if (response.statuscode === 200) {
          // this.apiData.successAlert(response.message);
          this.changeOccured=true;
          this.getCategory();
        }
        else {
          this.apiData.errorAlert(response.message);
        }
      })
      });
      this.categoryDeleteBucket=[];
      

    }
    if(this.changeOccured){
      this.apiData.successAlert("Changes are applied..!");
    }
  }
  trackById(index:number,item:any):number{
    return item.CatId;
  }
}
