import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}

  readonly langs = [
    { label: 'English', id: 'en' },
    { label: '简体中文', id: 'zh-hans' },
  ];

  detectLang(): string {
    const browerLang = navigator.language || navigator.languages[0];
    return this.mapToLang(browerLang);
  }

  mapToLang(browerLang: string): string {
    const lang = browerLang.toLowerCase().split('-')[0];
    if (lang === 'zh') {
      return 'zh-hans';
    }

    return 'en';
  }
}
