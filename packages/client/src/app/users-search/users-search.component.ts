import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.sass']
})
export class UsersSearchComponent implements OnInit {
  @ViewChild('search', { static: true }) searchInput: ElementRef;

  constructor(
    private store: StoreService
  ) { }

  ngOnInit(): void {
    this.listenSearch();
  }

  public listenSearch(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.store.triggerSearch(this.searchInput.nativeElement.value);
        })
      ).subscribe();
  }

}
