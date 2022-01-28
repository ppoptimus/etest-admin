import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfoDialogComponent } from './person-info-dialog.component';

describe('PersonInfoDialogComponent', () => {
  let component: PersonInfoDialogComponent;
  let fixture: ComponentFixture<PersonInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
