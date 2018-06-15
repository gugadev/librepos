import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionPointsComponent } from './emission-points.component';

describe('EmissionPointsComponent', () => {
  let component: EmissionPointsComponent;
  let fixture: ComponentFixture<EmissionPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
