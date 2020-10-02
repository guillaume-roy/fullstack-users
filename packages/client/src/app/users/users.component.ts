import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.refresh();
  }

  refresh(): void {
    this.usersService.findAll().subscribe(users => this.store.setUsers(users));
  }
}
