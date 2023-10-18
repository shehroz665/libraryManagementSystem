import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private router: Router, private api: ApiMethodsService) { }
  url: string = 'https://localhost:7084/api/author';
  authorFormData = new FormGroup({
    AuthName: new FormControl('', [Validators.required]),
  });
  get authName() {
    return this.authorFormData.get('AuthName');
  }
  postData() {
    if (this.authorFormData.value.AuthName !== '') {
      var data = {
        AuthName: this.authorFormData.value.AuthName,
        Status: 1
      };
      console.log(data);
      this.api.postDataUsingApi(this.url, data).subscribe((response: any) => {
        console.log(response);
        if (response.statuscode === 201) {
          this.api.successAlert(response.message);
          this.authorFormData.reset();
          this.router.navigate(['/author/view']);
        }
        else {
          this.api.errorAlert(response.message);
        }
      })
    }
    else {
      this.api.errorAlert('Please fill the forms fields...');
    }

  }

}
