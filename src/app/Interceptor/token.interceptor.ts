import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token:any=localStorage.getItem("token");
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenizedReq =request.clone({
      setHeaders:{
        'Content-Type':'application/json',
        'Authorization':`bearer ${this.token}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
