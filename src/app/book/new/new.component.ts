import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  constructor(private router: Router, private api: ApiMethodsService) { }
  url: string = 'https://localhost:7084/api/author';
  applyBookForm = new FormGroup({
    book: new FormControl('', [Validators.required]),
    borrowDate:new FormControl('', [Validators.required]),
    dueDate:new FormControl('', [Validators.required]),
    returnDate:new FormControl('', [Validators.required]),
  });
  getControl(controlName:string) {
    return this.applyBookForm.get(controlName);
  }
  postData() {
    console.log(this.applyBookForm.value);
    
    // if (this.applyBookForm.value.AuthName !== '') {
    //   var data = {
    //     AuthName: this.applyBookForm.value.AuthName,
    //     Status: 1
    //   };
    //   console.log(data);
    //   this.api.postDataUsingApi(this.url, data).subscribe((response: any) => {
    //     console.log(response);
    //     if (response.statuscode === 201) {
    //       this.api.successAlert(response.message);
    //       this.applyBookForm.reset();
    //       this.router.navigate(['home/author/view']);
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
