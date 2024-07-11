import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPaddingRuleComponent } from './number-padding-rule.component';

describe('NumberPaddingRuleComponent', () => {
  let component: NumberPaddingRuleComponent;
  let fixture: ComponentFixture<NumberPaddingRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberPaddingRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberPaddingRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
