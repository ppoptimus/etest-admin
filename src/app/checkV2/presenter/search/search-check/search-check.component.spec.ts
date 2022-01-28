import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCheckComponent } from './search-check.component';

describe('SearchCheckComponent', () => {
  let component: SearchCheckComponent;
  let fixture: ComponentFixture<SearchCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
