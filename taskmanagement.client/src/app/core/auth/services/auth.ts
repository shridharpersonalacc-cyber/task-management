import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/User.model';
import { LoginRequest } from '../models/LoginRequest.model';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private apiUrl = 'https://localhost:5001/api/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn = signal(false);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(request: LoginRequest) {
    return this.http.post<User>(`${this.apiUrl}/login`, request).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    const user = this.currentUserSubject.value;
    return user?.token ?? null;
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserSubject.next(parsedUser);
      this.isLoggedIn.set(true);
    }
  }
}