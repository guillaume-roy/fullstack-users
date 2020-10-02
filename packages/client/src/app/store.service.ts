import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './users/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private users = new BehaviorSubject<User[]>([]);
  private search = new BehaviorSubject<string>(undefined);

  public get users$(): Observable<User[]> {
    return this.users.asObservable();
  }


  public get search$(): Observable<string> {
    return this.search.asObservable();
  }

  constructor() { }

  public setUsers(users: User[]): void {
    this.users.next(users);
  }

  public triggerSearch(search: string): void {
    this.search.next(search);
  }
}
