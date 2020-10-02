import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersSearchComponent } from './users-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

describe('UsersSearchComponent', () => {
  let component: UsersSearchComponent;
  let fixture: ComponentFixture<UsersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersSearchComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
