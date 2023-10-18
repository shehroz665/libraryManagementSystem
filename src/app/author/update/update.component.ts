import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  url: string = 'https://localhost:7084/api/author';
  authorFormData = new FormGroup({
    AuthName: new FormControl('', [Validators.required]),
  });
  id:number=0;
  constructor(private router: Router, private api: ApiMethodsService,private routeWithId:ActivatedRoute) { 
    this.routeWithId.params.subscribe((param)=> {
      this.id=param['id'];
    })
  }

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
