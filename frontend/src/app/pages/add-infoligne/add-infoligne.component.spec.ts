import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoligneComponent } from './add-infoligne.component';

describe('AddInfoligneComponent', () => {
  let component: AddInfoligneComponent;
  let fixture: ComponentFixture<AddInfoligneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInfoligneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
