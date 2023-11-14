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
  bookStatusBucket: any[] = [];
  categoryDeleteBucket: number[] = [];
  categoryStatusBucket: any[] = [];
  changeOccured: boolean = false;
  sizeIcon: SizeProp = '1x';
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
  toggleChanged(category: any) {
    const existingIndex = this.categoryStatusBucket.findIndex(item => item.id === category.CatId);
    if (existingIndex !== -1) {
      this.categoryStatusBucket.splice(existingIndex, 1);
    }
    this.categoryStatusBucket.push(
      {
        id: category.CatId,
        status: category.toggleValue ? 1 : 0
      });
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
    const existCategory = this.bookDetail.findIndex((detail: any) => detail.CategoryId === category.CatId);
    if (existCategory === -1) {
      this.apiData.getDataFromApi(`https://localhost:7084/api/category/getAllCat/${category.CatId}`).subscribe((response: any) => {
        if (response.data.data[0].Books.length != 0) {
          const myBooks = response.data.data[0].Books.map((book:any)=>{
            return {
              ...book,
              toggleValue:book.Status===1? true: false,
            }
          })
          this.bookDetail.push({
            CategoryId: category.CatId,
            Books: myBooks,
          });
        }
      })
    }
  }
  toggleHideRow(category: any): void {
    category.isexpandRow = !category.isexpandRow
  }

  toggleBookChanged(book: any) {
    const existingIndex= this.bookStatusBucket.findIndex((res:any)=> res.BookId===book.BookId);
    if(existingIndex!=-1){
      this.bookStatusBucket.splice(existingIndex,1);
    }
    this.bookStatusBucket.push({
      id:book.BookId,
      status:book.toggleValue? 1 : 0
    });
    const existCategory = this.bookDetail.findIndex((detail: any) => detail.CategoryId === book.BookCatId);
    const existBook = this.bookDetail[existCategory].Books.findIndex((i: any) => i.BookId === book.BookId);
    if (this.bookDetail[existCategory].Books[existBook].Status === 1) {
      this.bookDetail[existCategory].Books[existBook].Status = 2;
    }
    else {
      this.bookDetail[existCategory].Books[existBook].Status = 1;
    }
  }
  saveChanges() {
    if (this.bookStatusBucket.length != 0) {
      // console.log(this.bookStatusBucket);
      
      this.bookStatusBucket = Array.from(new Set(this.bookStatusBucket));
      this.bookStatusBucket.forEach(i => {
        this.apiData.updateDataUsingApi(`https://localhost:7084/api/books/changeStatus/${i.id}`, {status:i.status}).subscribe((response: any) => {
          if (response.statuscode === 200) {
            this.apiData.successAlert(response.message);
            const updatedBookIndex = this.bookDetail.findIndex((book: any) => book.BookId === i.id);
            if (updatedBookIndex !== -1) {
              this.bookDetail[updatedBookIndex].toggleValue = response.data.Status===1? true : false;
            }
          }
          else {
            this.apiData.errorAlert(response.message);
          }
        });

      });
      this.bookStatusBucket = [];
    }
    if (this.categoryStatusBucket.length != 0) {
      this.categoryStatusBucket.forEach(i => {
        this.apiData.updateDataUsingApi(`https://localhost:7084/api/category/changeStatus/${i.id}`, { status: i.status }).subscribe((response: any) => {
          if (response.statuscode === 200) {
            this.apiData.successAlert(response.message);
            this.getCategory();
          }
          else {
            this.apiData.errorAlert(response.message);
          }
        });
      });
      this.categoryStatusBucket = [];


    }
    if (this.categoryDeleteBucket.length != 0) {
      this.categoryDeleteBucket = Array.from(new Set(this.categoryDeleteBucket));
      this.categoryDeleteBucket.forEach((id) => {
        var deleteUrl = `https://localhost:7084/api/category/delete/${id}`;
        this.apiData.updateDataUsingApi(deleteUrl, {}).subscribe((response: any) => {
          if (response.statuscode === 200) {
            this.apiData.successAlert(response.message);
            this.getCategory();
          }
          else {
            this.apiData.errorAlert(response.message);
          }
        })
      });
      this.categoryDeleteBucket = [];


    }
  }
  trackById(index: number, item: any): number {
    return item.CatId;
  }
  getBooksForCategory(catId: number): any[] {
    const existCategory = this.bookDetail.findIndex((res: any) => res.CategoryId === catId);
    return existCategory !== -1 ? this.bookDetail[existCategory].Books : [];
  }
  checkBooksExist(catId: number): boolean {
    const existCategory = this.bookDetail.findIndex((res: any) => res.CategoryId === catId);
    return existCategory !== -1 ? true : false;
  }
}
