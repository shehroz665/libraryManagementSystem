import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  constructor(private http:HttpClient) { }
  getDataFromApi(url:string){
   return  this.http.get(url);
  }
}
