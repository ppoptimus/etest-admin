import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckContainer } from './check.container';

describe('CheckContainer', () => {
  let component: CheckContainer;
  let fixture: ComponentFixture<CheckContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
