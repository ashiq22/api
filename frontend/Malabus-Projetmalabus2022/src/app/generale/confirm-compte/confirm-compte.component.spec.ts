import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCompteComponent } from './confirm-compte.component';

describe('ConfirmCompteComponent', () => {
  let component: ConfirmCompteComponent;
  let fixture: ComponentFixture<ConfirmCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
