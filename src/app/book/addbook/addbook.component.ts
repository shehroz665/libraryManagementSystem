import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
  url: string = 'https://localhost:7084/api/author';
  val:number=13;
  categories:any[]=[];
  authors:any[]=[];
  constructor(private router: Router, private api: ApiMethodsService) {
    this.api.getDataFromApi('https://localhost:7084/api/generic/dropdown').subscribe((response:any)=> {
        this.authors= response.data.authors;
        this.categories=response.data.category; 
        console.log(response.data);
          
    })
   }
  bookFormData = new FormGroup({
    Title:new FormControl('aa', [Validators.required]),
    BookCatId:new FormControl('', [Validators.required]),
    BookAuthId:new FormControl('', [Validators.required]),
    Quanity:new FormControl(13, [Validators.required]),
    Price:new FormControl(29, [Validators.required]), 
    ActualQuantity:new FormControl(27, [Validators.required]),
    AvailableQuantity:new FormControl(29, [Validators.required]),  
    Isbn:new FormControl('1122334455113', [Validators.required,Validators.pattern(/^\d{13}$/)]),   
  });

  getControl(controlName:string) {
    return this.bookFormData.get(controlName);
  }
  postData() {
    var book =this.bookFormData.value;
    var data={
      Title:book.Title,
      BookCatId:Number(book.BookCatId),
      BookAuthId:Number(book.BookAuthId),
      Price:book.Price, 
      ActualQuantity:book.ActualQuantity,
      AvailableQuantity:book.AvailableQuantity,  
      Isbn:book.Isbn, 
    };
    this.api.postDataUsingApi('https://localhost:7084/api/books',data).subscribe((response:any)=> {
      if(response.statuscode===201){
        this.api.successAlert(response.message);
        this.router.navigate(['/book/view']);
      }
      else{
        this.api.errorAlert(response.message);
      }
    });
  }
}
