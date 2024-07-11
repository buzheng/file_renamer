import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdRuleComponent } from './id-rule.component';

describe('IdRuleComponent', () => {
  let component: IdRuleComponent;
  let fixture: ComponentFixture<IdRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
