import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTestEngineComponent } from './check-test-engine.component';

describe('CheckTestEngineComponent', () => {
  let component: CheckTestEngineComponent;
  let fixture: ComponentFixture<CheckTestEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTestEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTestEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
