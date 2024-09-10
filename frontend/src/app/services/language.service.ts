import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}

  readonly langs = [
    { label: 'English', value: 'en' },
    { label: '简体中文', value: 'zh-Hans' },
  ];
}
