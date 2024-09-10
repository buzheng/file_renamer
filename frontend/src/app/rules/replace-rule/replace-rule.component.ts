import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Rule, RuleEditor } from '../rule';
import { ReplaceConfig, ReplaceRule, ReplaceType } from './replace-rule';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-replace-rule',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    KeyFilterModule,
    TranslateModule,
  ],
  templateUrl: './replace-rule.component.html',
  styleUrl: './replace-rule.component.css',
})
export class ReplaceRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: ReplaceConfig;

  invalidFilenameChars: RegExp = /^[^\\\/:*?"<>|]+$/;

  replaceTypes: ReplaceType[] = ['All', 'First', 'Last'];

  get rule(): Rule {
    return new ReplaceRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (!this.config) {
        this.config = {
          includeExtension: false,
          from: '',
          to: '',
          caseSensitive: true,
          isRegex: false,
          type: 'All',
        };
      }
    }
  }
}
