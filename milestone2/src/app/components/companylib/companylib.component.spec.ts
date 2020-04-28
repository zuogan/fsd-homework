import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyibComponent } from './companylib.component';

describe('CompanyibComponent', () => {
  let component: CompanyibComponent;
  let fixture: ComponentFixture<CompanyibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
