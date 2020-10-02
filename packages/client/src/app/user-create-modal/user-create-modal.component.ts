import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../users/user.model';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.sass']
})
export class UserCreateModalComponent implements OnInit {
  user = new User();

  constructor(private dialogRef: MatDialogRef<UserCreateModalComponent>) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    this.dialogRef.close({ user: this.user });
  }
}
