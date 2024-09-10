import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Rule, RuleEditor } from '../rule';
import { IdCreator, IdRule, IdRuleConfig, IdWhere } from './id-rule';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-id-rule',
  standalone: true,
  imports: [
    FormsModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    KeyFilterModule,
    TranslateModule,
  ],
  templateUrl: './id-rule.component.html',
  styleUrl: './id-rule.component.css',
})
export class IdRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: IdRuleConfig;

  invalidFilenameChars: RegExp = /^[^\\\/:*?"<>|]+$/;

  idCreators: IdCreator[] = ['Counter', 'UUID', 'NanoID'];
  idWheres: IdWhere[] = ['Filename', 'Start', 'End', 'Position', 'BeforeText', 'AfterText'];

  get rule(): Rule {
    return new IdRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (!this.config) {
        this.config = {
          includeExtension: false,
          creator: 'Counter',
          randomLength: 21,
          counterLength: 1,
          where: 'Filename',
          position: 1,
          beforeText: '',
          afterText: '',
          separator: '-',
        };
      }
    }
  }
}
