import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  /**
   *
   */
  private apiUrl = 'http://localhost:62991/api/Product';
  constructor(private http: HttpClient) {
    this.setTokenFromLocalStorage('');

  }

  setTokenFromLocalStorage(tokenFromWebApi: string) {
    localStorage.setItem("token", tokenFromWebApi)
  }

  getTokenFromLocalStorage(): string | null {
    cookieStore.set("", "");
    return localStorage.getItem("token");
    //localStorage.setItem("token", tokenFromWebApi)
  }

  getProductServiceData(): Observable<ProductModel> {
    const token = this.getTokenFromLocalStorage();
    return this.http.get<ProductModel>(`${this.apiUrl}?id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }

}
