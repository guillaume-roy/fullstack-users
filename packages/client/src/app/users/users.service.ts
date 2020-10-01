import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public findAll(query?: string): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/users`, {
      params: query ? { query } : undefined
    }).pipe(map((data: any[]) => plainToClass(User, data)));
  }

  public create(email: string, firstname: string, lastname: string, password: string): Observable<User> {
    return this.http.post(`${environment.apiUrl}/users`, {
      email,
      firstname,
      lastname,
      password
    }).pipe(map(u => plainToClass(User, u)));
  }
}
