import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { CaseRuleComponent } from './case-rule/case-rule.component';
import { IdRuleComponent } from './id-rule/id-rule.component';
import { InsertRuleComponent } from './insert-rule/insert-rule.component';
import { NumberPaddingRuleComponent } from './number-padding-rule/number-padding-rule.component';
import { RemoveRuleComponent } from './remove-rule/remove-rule.component';
import { ReplaceRuleComponent } from './replace-rule/replace-rule.component';
import { Rule, RuleConfig, RuleEditor } from './rule';
import { SeriesRuleComponent } from './series-rule/series-rule.component';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    MenuModule,
    DialogModule,
    DialogModule,
    SelectButtonModule,
    CaseRuleComponent,
    InsertRuleComponent,
    ReplaceRuleComponent,
    RemoveRuleComponent,
    SeriesRuleComponent,
    NumberPaddingRuleComponent,
    IdRuleComponent,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    TranslateModule,
    MenuItemComponent,
  ],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
})
export class RulesComponent implements OnInit {
  items: RuleListItem[] = [];

  ruleTypes: RuleType[] = ['Case', 'Insert', 'Replace', 'Remove', 'Series', 'NumberPadding', 'ID'];

  ruleTypeMenus!: MenuItem[];

  visible: boolean = false;

  action?: 'add' | 'edit';

  editRuleType?: RuleType;
  editRuleIndex?: number;
  editRuleConfig?: any;

  @ViewChild('ruleEditor')
  ruleEditor!: RuleEditor;

  @Output()
  onChange = new EventEmitter<Rule[]>();

  dragIndex?: number;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: any) => {
      this.initRuleTypeMenus();
    });
  }

  initRuleTypeMenus() {
    this.ruleTypeMenus = this.ruleTypes.map(type => ({
      label: type,
      command: () => this.openRuleEditor(type),
    }));
  }

  openRuleEditor(type: RuleType, config?: RuleConfig) {
    this.editRuleType = type;
    this.action = config ? 'edit' : 'add';
    this.visible = true;
  }

  saveRule() {
    const rule = this.ruleEditor.rule;

    if (this.action === 'add') {
      this.items.push({ checked: true, type: this.editRuleType!, rule });
    } else if (this.action === 'edit') {
      this.items[this.editRuleIndex!].rule = rule;
    }

    this.emitChages();

    this.visible = false;

    this.action = undefined;
    this.editRuleType = undefined;
    this.editRuleIndex = undefined;
    this.editRuleConfig = undefined;
  }

  onCheckBoxChange() {
    this.emitChages();
  }

  editRule(index: number) {
    const item = this.items[index];
    this.editRuleType = item.type;
    this.editRuleIndex = index;
    this.editRuleConfig = { ...item.rule.config };

    this.openRuleEditor(item.type, item.rule.config);
  }

  removeRule(index: number) {
    this.items.splice(index, 1);
    this.emitChages();
  }

  removeSelectedRules() {
    this.items = this.items.filter(item => !item.checked);
    this.emitChages();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.emitChages();
  }

  private emitChages() {
    this.onChange.emit(this.checkedRules);
  }

  private get checkedRules(): Rule[] {
    return this.items.filter(item => item.checked).map(item => item.rule);
  }

  getDesc(rule: Rule): string {
    const key = 'rules.' + rule.name + '.' + rule.descTranslationKey;
    return this.translateService.instant(key, rule.config);
  }

  getExtensionDesc(rule: Rule): string {
    const key =
      'rules.extension.' +
      (rule.handleExtensionOnly ? 'only' : rule.config.includeExtension ? 'include' : 'exclude');

    return this.translateService.instant(key);
  }
}

type RuleType =
  | 'Case'
  | 'Insert'
  | 'Remove'
  | 'Replace'
  | 'Series'
  | 'Padding'
  | 'NumberPadding'
  | 'ID';

interface RuleListItem {
  checked: boolean;
  type: RuleType;
  rule: Rule;
}
