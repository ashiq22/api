import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVoyageComponent } from './gestion-voyage.component';

describe('GestionVoyageComponent', () => {
  let component: GestionVoyageComponent;
  let fixture: ComponentFixture<GestionVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionVoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
