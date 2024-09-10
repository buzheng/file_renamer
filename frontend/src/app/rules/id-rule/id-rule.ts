import { nanoid } from 'nanoid';
import { AbstractRule, RuleConfig } from '../rule';

export type IdCreator = 'Counter' | 'UUID' | 'NanoID';

export type IdWhere = 'Filename' | 'Start' | 'End' | 'Position' | 'BeforeText' | 'AfterText';

export interface IdRuleConfig extends RuleConfig {
  creator: IdCreator;
  randomLength: number;
  counterLength: number;

  where: IdWhere;
  position: number;
  beforeText: string;
  afterText: string;

  separator: string;
}

export class IdRule extends AbstractRule {
  constructor(override config: IdRuleConfig) {
    super(config);
  }

  override get name(): string {
    return 'ID';
  }

  override apply(name: string, index: number): string {
    const {
      creator,
      randomLength,
      counterLength,
      where,
      position,
      beforeText,
      afterText,
      separator,
    } = this.config;

    let id: string = '';

    switch (creator) {
      case 'Counter':
        id = (index + 1).toString().padStart(counterLength < 1 ? 1 : counterLength, '0');
        break;
      case 'NanoID':
        id = nanoid(randomLength < 1 ? 1 : randomLength);
        break;
      case 'UUID':
        id = crypto.randomUUID();
        break;
    }

    switch (where) {
      case 'Filename':
        return id;
      case 'Start':
        return this.concat('', id, name, separator);
      case 'End':
        return this.concat(name, id, '', separator);
      case 'Position':
        let pos = position - 1;
        pos = pos < 0 ? 0 : pos;
        return this.concat(name.slice(0, pos), id, name.slice(pos), separator);
      case 'BeforeText':
        if (beforeText !== '') {
          const beforeIndex = name.indexOf(beforeText);
          if (beforeIndex !== -1) {
            return this.concat(name.slice(0, beforeIndex), id, name.slice(beforeIndex), separator);
          }
        }

        return name;
      case 'AfterText':
        if (afterText !== '') {
          const index = name.indexOf(afterText);
          if (index !== -1) {
            const afterIndex = index + afterText.length;
            return this.concat(name.slice(0, afterIndex), id, name.slice(afterIndex), separator);
          }
        }

        return name;
    }
  }

  private concat(leading: string, id: string, trailing: string, separator: string): string {
    if (leading === '' && trailing === '') {
      return id;
    }

    if (leading === '') {
      return id + separator + trailing;
    }

    if (trailing === '') {
      return leading + separator + id;
    }

    return leading + separator + id + separator + trailing;
  }

  override get descTranslationKey(): string {
    return `desc.${this.config.where}`;
  }
}
