import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    const userId = this.getLoggedInUserId();
    document.cookie = `userId=${userId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    return this.http.post<any>(`${this.apiUrl}/logout`, { userId });
  }

  isLoggedIn(): boolean {
    const userId = this.getLoggedInUserId();
    return !!userId;
  }

  getLoggedInUserId(): string {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'userId') {
        return value;
      }
    }
    return '';
  }
}
