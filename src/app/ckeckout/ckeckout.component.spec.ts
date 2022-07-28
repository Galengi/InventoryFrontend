import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeckoutComponent } from './ckeckout.component';

describe('CkeckoutComponent', () => {
  let component: CkeckoutComponent;
  let fixture: ComponentFixture<CkeckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkeckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
