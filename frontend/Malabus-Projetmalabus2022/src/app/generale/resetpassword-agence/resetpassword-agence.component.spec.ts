import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordAgenceComponent } from './resetpassword-agence.component';

describe('ResetpasswordAgenceComponent', () => {
  let component: ResetpasswordAgenceComponent;
  let fixture: ComponentFixture<ResetpasswordAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpasswordAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
