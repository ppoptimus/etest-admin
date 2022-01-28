import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';


@Component({
  selector: 'search-check',
  templateUrl: './search-check.component.html',
  styleUrls: ['./search-check.component.scss']
})
export class SearchCheckComponent implements OnInit, AfterViewInit {
  @Input() occList: any = [];
  @Output() onSearhOc = new EventEmitter ();
  @Output() onFilter = new EventEmitter();
  @ViewChild('searchInput', {static: true}) searchInput:ElementRef<HTMLInputElement>
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap((result) => this.onFilter.emit(result)),
      tap(() => this.cdRef.detectChanges())
    ).subscribe()
  }

  searchOc(val){
    this.onSearhOc.emit(val);
  }



}
