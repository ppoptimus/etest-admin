import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllListComponent } from './report-all-list.component';

describe('ReportAllListComponent', () => {
  let component: ReportAllListComponent;
  let fixture: ComponentFixture<ReportAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
