import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistration } from '../models/user-registration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  register(user: UserRegistration): Observable<number> {
    return this.http.post<number>(this.apiUrl, user);
  }
}