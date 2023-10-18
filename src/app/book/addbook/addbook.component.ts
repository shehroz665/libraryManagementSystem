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
    })
   }
  bookFormData = new FormGroup({
    Title:new FormControl('aa', [Validators.required]),
    CatName:new FormControl('', [Validators.required]),
    AutName:new FormControl('', [Validators.required]),
    Quanity:new FormControl(10, [Validators.required]),
    Price:new FormControl(80, [Validators.required]), 
    ActualQuantity:new FormControl(80, [Validators.required]),
    AvailableQuantity:new FormControl(80, [Validators.required]),  
    Isbn:new FormControl(1234567890123, [Validators.required,Validators.pattern(/^\d{13}$/)]),   
  });
  getControl(controlName:string) {
    return this.bookFormData.get(controlName);
  }
  postData() {
    console.log(this.bookFormData.value);
    
    // if (this.authorFormData.value.Title !== '') {
    //   var data = {
    //     AuthName: this.authorFormData.value.Title,
    //     Status: 1
    //   };
    //   console.log(data);
    //   this.api.postDataUsingApi(this.url, data).subscribe((response: any) => {
    //     console.log(response);
    //     if (response.statuscode === 201) {
    //       this.api.successAlert(response.message);
    //       this.authorFormData.reset();
    //       this.router.navigate(['/author/view']);
    //     }
    //     else {
    //       this.api.errorAlert(response.message);
    //     }
    //   })
    // }
    // else {
    //   this.api.errorAlert('Please fill the forms fields...');
    // }

  }
}
