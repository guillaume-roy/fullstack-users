import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './users/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private users = new BehaviorSubject<User[]>([]);

  public get users$(): Observable<User[]> {
    return this.users.asObservable();
  }

  constructor() { }

  public setUsers(users: User[]): void {
    this.users.next(users);
  }
}
