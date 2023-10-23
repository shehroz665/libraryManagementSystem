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
    if(this.id!=0){
      var urlForGetAuthorByID=this.url+`/${this.id}`;
      this.api.getDataFromApi(urlForGetAuthorByID).subscribe((response:any)=>{
        if(response.statuscode===200){
          this.authorFormData.patchValue({
            AuthName: response.data.AuthName,
          });
        }
        else{
          this.api.errorAlert('Some error occured..!');
        }
      })
    }
  }
 
  get authName() {
    return this.authorFormData.get('AuthName');
  }
  updateData() {
    if (this.authorFormData.value.AuthName !== '') {
      var urlForPutMethod= `https://localhost:7084/api/author/update/${this.id}`
      var data = {
        AuthName: this.authorFormData.value.AuthName,
        Status: 1
      };
      this.api.updateDataUsingApi(urlForPutMethod, data).subscribe((response: any) => {
        if (response.statuscode === 200) {
          this.api.successAlert(response.message);
          this.authorFormData.reset();
          this.router.navigate(['home/author/view']);
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
