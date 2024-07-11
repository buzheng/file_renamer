import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRuleComponent } from './case-rule.component';

describe('CaseRuleComponent', () => {
  let component: CaseRuleComponent;
  let fixture: ComponentFixture<CaseRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
