import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { User } from './user.model';
import { UsersComponent } from './users.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UsersSearchComponent } from '../users-search/users-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent, UsersSearchComponent],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display "No user found" if no users`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card:nth-child(2)').textContent).toContain('No user found');
  });

  it(`should display a list of users if there is users`, () => {
    const compiled = fixture.nativeElement;
    const user1 = new User();
    user1.id = '123456';
    user1.email = 'john.smith@acme.com';
    user1.firstname = 'John';
    user1.lastname = 'Smith';
    user1.password = 'fhksfhkmfmqf4522!:';
    const user2 = new User();
    user2.id = '654321';
    user2.email = 'jane.doe@acme.com';
    user2.firstname = 'Jane';
    user2.lastname = 'Doe';
    user2.password = '5352;:;hkDKDN';
    const users = [user1, user2];
    component.users = of(users);
    fixture.detectChanges();
    const items = compiled.querySelectorAll('mat-card mat-list mat-list-item');
    expect(items.length).toBe(2);
  });
});
