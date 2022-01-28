import { ChangeDetectorRef, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.scss']
})
export class SearchQuestionComponent implements OnInit {
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
