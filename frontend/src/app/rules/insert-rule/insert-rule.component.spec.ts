import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRuleComponent } from './insert-rule.component';

describe('InsertRuleComponent', () => {
  let component: InsertRuleComponent;
  let fixture: ComponentFixture<InsertRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
