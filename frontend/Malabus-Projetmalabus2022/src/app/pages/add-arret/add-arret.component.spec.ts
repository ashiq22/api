import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArretComponent } from './add-arret.component';

describe('AddArretComponent', () => {
  let component: AddArretComponent;
  let fixture: ComponentFixture<AddArretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArretComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
