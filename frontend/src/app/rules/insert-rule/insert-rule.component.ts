import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InsertRule, InsertRuleConfig, InsertWhere } from './insert-rule';
import { RuleEditor } from '../rule';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-insert-rule',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    KeyFilterModule,
    CheckboxModule,
    TranslateModule,
  ],
  templateUrl: './insert-rule.component.html',
  styleUrl: './insert-rule.component.css',
})
export class InsertRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: InsertRuleConfig;

  invalidFilenameChars: RegExp = /^[^\\\/:*?"<>|]+$/;

  insertTypes: InsertWhere[] = ['Start', 'End', 'Position', 'BeforeText', 'AfterText'];

  get rule(): InsertRule {
    return new InsertRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (this.config === undefined || this.config === null) {
        this.config = {
          includeExtension: false,
          text: '',
          where: 'Start',
          position: 0,
          positionFromEnd: false,
          beforeText: '',
          afterText: '',
        };
      }
    }
  }
}
