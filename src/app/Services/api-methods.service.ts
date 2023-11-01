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
    var headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.get(url, { headers });
  }
  postDataUsingApi(url: string, data: any) {
    var headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, data, { headers });
  }
  updateDataUsingApi(url: string, data: any) {
    var headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.put(url, data, { headers });
  }
  postOrUpdate(url: string, data: any, id: number) {
    var headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    if (id === 1) { //post
      return this.http.post(url, data, { headers });
    }
    else {       //update
      return this.http.put(url, data, { headers });
    }
  }
  login(url: string, data: any) {
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
    var headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.get<Books[]>(url, { headers });
  }
}
