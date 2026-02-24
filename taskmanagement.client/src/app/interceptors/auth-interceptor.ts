/* Below is the Class based interceptor*/

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   *
   */
  constructor(private http: HttpClient) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    const authReq = token
      ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      : req;

    console.log('HTTP Request:', authReq);

    var sendNext = next.handle(authReq).pipe(
      // Catch error If any 
      tap(event => {
        console.log('HTTP Response:', event);
      }),
      // Catch error If any 
      // 
      catchError((error: HttpErrorResponse) => {
        // if authorized 
        // Auto Refresh Strategy
        if (error.status === 401) {
          return this.http.get('/api/auth/token').pipe(
            switchMap(res => {
              localStorage.setItem('token', res.toString());
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res}`
                }
              });
              return next.handle(req);
            })
          )
        }


        if (error.status === 401) {
          console.error('Unauthorized! Redirect to login...');
        }


        return throwError(() => error);
      })
    );

    return sendNext;
  }
}


/*

Below is the Functional Interceptor – Recommended


import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  // Example: Get token from localStorage
  const token = localStorage.getItem('token');

  // Clone request and add Authorization header if token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  console.log('HTTP Request:', authReq);

  return next(authReq).pipe(
    tap(event => {
      console.log('HTTP Response:', event);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized! Redirect to login...');
        // You could redirect here
        // inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};


*/