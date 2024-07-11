import { AbstractRule, RuleConfig } from '../rule';

export type InsertWhere = 'Start' | 'End' | 'Position' | 'BeforeText' | 'AfterText';

export interface InsertRuleConfig extends RuleConfig {
  text: string;
  where: InsertWhere;
  position: number;
  positionFromEnd: boolean;
  beforeText: string;
  afterText: string;
}

export class InsertRule extends AbstractRule {
  constructor(override config: InsertRuleConfig) {
    super(config);
  }

  get name(): string {
    return 'Insert';
  }

  override get description(): string {
    let whereDesc = '';
    switch (this.config.where) {
      case 'Start':
        whereDesc = 'at the start';
        break;
      case 'End':
        whereDesc = 'at the end';
        break;
      case 'Position':
        whereDesc = `at position ${this.config.position}`;
        if (this.config.positionFromEnd) {
          whereDesc += ' from the end';
        }
        break;
      case 'BeforeText':
        whereDesc = `before "${this.config.beforeText}"`;
        break;
      case 'AfterText':
        whereDesc = `after "${this.config.afterText}"`;
        break;
    }

    return `Insert "${this.config.text}" ${whereDesc}, ${super.description}`;
  }

  override apply(name: string): string {
    let renamed = name;
    switch (this.config.where) {
      case 'Start':
        renamed = this.config.text + name;
        break;
      case 'End':
        renamed = name + this.config.text;
        break;
      case 'Position':
        let position = this.config.positionFromEnd
          ? name.length - this.config.position
          : this.config.position;

        if (position < 0) {
          position = 0;
        }

        renamed = name.slice(0, position) + this.config.text + name.slice(position);
        break;
      case 'BeforeText':
        const beforeText = this.config.beforeText;
        if (beforeText && beforeText !== '') {
          const index = name.indexOf(beforeText);
          if (index !== -1) {
            renamed = name.slice(0, index) + this.config.text + name.slice(index);
          }
        }
        break;
      case 'AfterText':
        const afterText = this.config.afterText;
        if (afterText && afterText !== '') {
          const index = name.indexOf(afterText);
          if (index !== -1) {
            const afterIndex = index + afterText.length;
            renamed = name.slice(0, afterIndex) + this.config.text + name.slice(afterIndex);
          }
        }
        break;
    }

    return renamed;
  }
}
