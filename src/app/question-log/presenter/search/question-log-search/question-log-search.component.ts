import { ChangeDetectorRef, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'question-log-search',
  templateUrl: './question-log-search.component.html',
  styleUrls: ['./question-log-search.component.scss']
})
export class QuestionLogSearchComponent implements OnInit {
  @Input() occList: any = [];
  @Output() searchOc = new EventEmitter ();
  @Output() search = new EventEmitter();
  @ViewChild('searchInput', {static: true}) searchInput:ElementRef<HTMLInputElement>
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap((result) => this.search.emit(result)),
      tap(() => this.cdRef.detectChanges())
    ).subscribe();
  }

  searchOcc(val){
    this.searchOc.emit(val);
  }



}