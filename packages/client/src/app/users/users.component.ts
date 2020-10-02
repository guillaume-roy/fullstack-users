import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { StoreService } from '../store.service';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  public users: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    this.users = this.store.users$;
    this.store.search$
      .pipe(
        switchMap(search => this.usersService.findAll(search)),
        tap(users => this.store.setUsers(users))
      ).subscribe();
  }

  refresh(query?: string): void {
    this.usersService.findAll().subscribe(users => this.store.setUsers(users));
  }
}
