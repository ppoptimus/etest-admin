import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckComponent } from './list-check.component';

describe('ListCheckComponent', () => {
  let component: ListCheckComponent;
  let fixture: ComponentFixture<ListCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
