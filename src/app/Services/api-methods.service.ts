import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2'
import { Observable, retry } from 'rxjs';
import jwtDecode from 'jwt-decode';
interface Books {
  BookId: number,
  Title: string,
  BookCatId: number,
  BookAuthId: number,
  Isbn: string,
  ActualQuantity: number,
  AvailableQuantity: number,
  Price: number,
  Status: number,
  CatId: number,
  CatName: string,
  AuthId: number,
  AuthName: string,
};
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
  updateDataUsingApi(url: string, data: any) {
   
    return this.http.put(url, data);
  }
  postOrUpdate(url: string, data: any, id: number) {
    if (id === 1) { 
      return this.http.post(url, data);
    }
    else {
      return this.http.put(url, data);
    }
  }
  login(url: string, data: any) {
    return this.http.post(url, data);
  }
  signUp(url: string, data: any) {
    return this.http.post(url, data);
  }
  isLogin() {
    return localStorage.getItem("token") || '';
  }
  decodeToken() {
    const token: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token);
    return Number(decodedToken['RoleId']);
  }
  getTokenFields(title: string) {
    const token: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token);
    return decodedToken[title];
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
  authorizeNavbars(roleId: number) {
    const author: any[] = [
      { id: 1, path: 'category/view', pathName: 'Categories' },
      { id: 2, path: 'author/view', pathName: 'Authors' },
      { id: 3, path: 'book/view', pathName: 'Books' },
      { id: 4, path: 'book/apply', pathName: 'Requests' },
    ];
    const studentOrTeacher: any[] = [
      { id: 1, path: 'book/view', pathName: 'Books' },
      { id: 2, path: 'book/apply', pathName: 'Apply' },
      { id: 3, path: 'profile/edit', pathName: 'Profile' },

    ];
    if (roleId === 1) {
      return author;
    }
    return studentOrTeacher;
  }
  gettheBooks(url:string):Observable<Books[]> {
   
    return this.http.get<Books[]>(url);
  }
}
