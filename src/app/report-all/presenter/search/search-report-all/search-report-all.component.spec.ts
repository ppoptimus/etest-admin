import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportAllComponent } from './search-report-all.component';

describe('SearchReportAllComponent', () => {
  let component: SearchReportAllComponent;
  let fixture: ComponentFixture<SearchReportAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReportAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReportAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
