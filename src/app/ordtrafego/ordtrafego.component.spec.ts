import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdtrafegoComponent } from './ordtrafego.component';

describe('OrdtrafegoComponent', () => {
  let component: OrdtrafegoComponent;
  let fixture: ComponentFixture<OrdtrafegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdtrafegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdtrafegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
