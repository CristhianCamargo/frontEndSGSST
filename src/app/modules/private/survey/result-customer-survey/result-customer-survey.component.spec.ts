import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCustomerSurveyComponent } from './result-customer-survey.component';

describe('ResultCustomerSurveyComponent', () => {
  let component: ResultCustomerSurveyComponent;
  let fixture: ComponentFixture<ResultCustomerSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultCustomerSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCustomerSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
