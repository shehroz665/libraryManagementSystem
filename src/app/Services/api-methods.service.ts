import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2'
import { retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  constructor(private http: HttpClient) { }
  getDataFromApi(url: string) {
    var headers=new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.get(url,{headers});
  }
  postDataUsingApi(url: string, data: any) {
    var headers=new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, data,{headers});
  }
  updateDataUsingApi(url:string,data:any){
    var headers=new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.put(url,data,{headers});
  }
  login(url:string,data:any){
    return this.http.post(url, data);
  }
  successAlert(message: string) {
    return Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
  errorAlert(message: string) {
    return Swal.fire({
      icon: 'error',
      text: message
    });
  }
}
