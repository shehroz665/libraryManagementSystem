import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private router:Router){}
  authorFormData=new FormGroup({
    AuthName:new FormControl('',[Validators.required]),
  });
  get authName(){
   return  this.authorFormData.get('AuthName');
  }
  goToView(){
    if(this.authorFormData.value.AuthName!==''){
      console.log('filled');
      this.router.navigate(['/author/view']);
    }
    else{
      console.log('not filled');
    }
  
  }

}
