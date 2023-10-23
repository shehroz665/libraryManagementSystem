import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent {
  url: string = 'https://localhost:7084/api/author';
  val:number=13;
  categories:any[]=[];
  authors:any[]=[];
  id:number=0;
  constructor(private router: Router, private api: ApiMethodsService,private route:ActivatedRoute) {
    this.route.params.subscribe((param)=> {
      this.id=param['id'];      
    })
    if(this.id!=0){
      this.api.getDataFromApi(`https://localhost:7084/api/books/${this.id}`).subscribe((response:any)=>{
        var responseData= response.data;
        this.bookFormData.setValue({
          Title:responseData.Title,
          BookCatId:responseData.BookCatId,
          BookAuthId:responseData.BookAuthId,
          Price:responseData.Price, 
          ActualQuantity:responseData.ActualQuantity,
          AvailableQuantity:responseData.AvailableQuantity,  
          Isbn:responseData.Isbn,  
        }); 
      })
    }
    this.api.getDataFromApi('https://localhost:7084/api/generic/dropdown').subscribe((response:any)=> {
        this.authors= response.data.authors;
        this.categories=response.data.category; 
        console.log(response.data);
          
    })
   }
  bookFormData = new FormGroup({
    Title:new FormControl('', [Validators.required]),
    BookCatId:new FormControl('', [Validators.required]),
    BookAuthId:new FormControl('', [Validators.required]),
    Price:new FormControl(0, [Validators.required]), 
    ActualQuantity:new FormControl(0, [Validators.required]),
    AvailableQuantity:new FormControl(0, [Validators.required]),  
    Isbn:new FormControl('', [Validators.required,Validators.pattern(/^\d{13}$/)]),   
  });

  getControl(controlName:string) {
    return this.bookFormData.get(controlName);
  }
  updateData() {
    const patchOperations = [];
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
    this.api.updateDataUsingApi(`https://localhost:7084/api/books/update/${this.id}`,data).subscribe((response:any)=> {
      if(response.statuscode===200){
        this.api.successAlert(response.message);
        this.router.navigate(['home/book/view']);
      }
      else{
        this.api.errorAlert(response.message);
      }
    });
    

  }
}
