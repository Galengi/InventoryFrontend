import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUnitComponent } from './type-unit.component';

describe('TypeUnitComponent', () => {
  let component: TypeUnitComponent;
  let fixture: ComponentFixture<TypeUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
