import { AbstractRule, RuleConfig } from '../rule';

export type SeriesWhere = 'Prefix' | 'Suffix' | 'Position' | 'Whole';

export interface SeriesConfig extends RuleConfig {
  where: SeriesWhere;
  position: number;

  start: number;
  step: number;
  repeat: number;
  padding: number;
  resetEvery: number;

  separator: string;
}

export class SeriesRule extends AbstractRule {
  constructor(override config: SeriesConfig) {
    super(config);
  }

  override get name(): string {
    return 'Series';
  }

  override get description(): string {
    let { start, step, repeat, padding, resetEvery } = this.config;

    let whereDesc = '';
    switch (this.config.where) {
      case 'Prefix':
        whereDesc = 'As prefix';
        break;
      case 'Suffix':
        whereDesc = 'As suffix';
        break;
      case 'Position':
        whereDesc = 'At position: ' + this.config.position.toString();
        break;
      case 'Whole':
        whereDesc = 'As filename';
        break;
    }

    const resetDesc = resetEvery > 0 ? `Reset every ${this.config.resetEvery} files` : '';

    return `${whereDesc} start ${start} step ${step} repeat ${repeat}, Pad to ${padding}, ${resetDesc}`;
  }

  override apply(name: string, index: number): string {
    let { start, step, repeat, padding, resetEvery, separator } = this.config;
    resetEvery = resetEvery || 999999;
    repeat = repeat || 1;
    padding = padding || 0;

    const indexInSeries = index % resetEvery;
    const series = start + Math.floor(indexInSeries / repeat) * step;
    const seriesStr = series.toString().padStart(padding, '0');

    switch (this.config.where) {
      case 'Prefix':
        return seriesStr + separator + name;
      case 'Suffix':
        return name + separator + seriesStr;
      case 'Position':
        let position = this.config.position;
        return name.slice(0, position) + seriesStr + name.slice(position);
      case 'Whole':
        return seriesStr;
      default:
        return name;
    }
  }
}
