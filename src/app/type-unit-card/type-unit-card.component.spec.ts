import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUnitCardComponent } from './type-unit-card.component';

describe('TypeUnitCardComponent', () => {
  let component: TypeUnitCardComponent;
  let fixture: ComponentFixture<TypeUnitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeUnitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeUnitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
