import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassagenceComponent } from './forgetpassagence.component';

describe('ForgetpassagenceComponent', () => {
  let component: ForgetpassagenceComponent;
  let fixture: ComponentFixture<ForgetpassagenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpassagenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpassagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
