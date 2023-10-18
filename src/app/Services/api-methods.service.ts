import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  constructor(private http: HttpClient) { }
  getDataFromApi(url: string) {
    return this.http.get(url);
  }
  postDataUsingApi(url: string, data: any) {
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
