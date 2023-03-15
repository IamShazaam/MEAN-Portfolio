import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly AUTH_API_URL = 'http://localhost:3000';
  authToken: string | null = null;


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.AUTH_API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        this.authToken = res.token;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.AUTH_API_URL}/logout`, { token: this.authToken }).pipe(
      tap(() => {
        this.authToken = null;
      })
    );
  }

  getAuthToken(): string | null {
    return this.authToken;
  }
}
