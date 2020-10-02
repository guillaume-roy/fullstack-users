import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { StoreService } from './store.service';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';
import { User } from './users/user.model';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'Fullstack-Users';

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private store: StoreService,
    private snackBar: MatSnackBar) {
  }

  public showAddUserModal(): void {
    const dialogRef = this.dialog.open(UserCreateModalComponent);
    dialogRef.afterClosed().subscribe((result: { user: User }) => {
      const user = result.user;
      this.usersService.create(user.email, user.firstname, user.lastname, user.password)
        .pipe(
          tap(
            () => this.store.userCreated(),
            (err: HttpErrorResponse) => {
              if (err && err.error && err.error.message && Array.isArray(err.error.message)) {
                alert(`Error(s):\n- ${err.error.message.join('\n- ')}`);
              } else {
                alert('An error has occured.');
              }
            }),
          tap(u => this.snackBar.open(`User ${u.displayName} successfully created`, undefined, { duration: 2000 })),
        ).subscribe();
    });
  }
}
