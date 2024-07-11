import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  private window = this.document.defaultView!;

  private _theme: Theme = 'system';

  private prefersDarkScheme = this.window.matchMedia('(prefers-color-scheme: dark)');

  darkSchemeChangeListner = (e: MediaQueryListEvent) => {
    this.applyTheme(e.matches);
  };

  get theme() {
    return this._theme;
  }

  setTheme(theme?: Theme) {
    theme = theme || this.getSavedTheme();
    this.saveTheme(theme);

    this._theme = theme;

    if (theme === 'system') {
      this.applyTheme(this.prefersDarkScheme.matches);
      this.prefersDarkScheme.addEventListener('change', this.darkSchemeChangeListner);
    } else {
      this.applyTheme(theme === 'dark');
      this.prefersDarkScheme.removeEventListener('change', this.darkSchemeChangeListner);
    }
  }

  toggleTheme() {
    const theme = this._theme === 'light' ? 'dark' : this._theme === 'dark' ? 'system' : 'light';
    this.setTheme(theme);
  }

  private applyTheme(isDarkTheme: boolean) {
    const theme = isDarkTheme ? 'dark' : 'light';
    const themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
    themeLink.href = `theme-${theme}.css`;

    if (isDarkTheme) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  private getSavedTheme(): Theme {
    return (this.window.localStorage.getItem('theme') as Theme) || 'system';
  }

  private saveTheme(theme: Theme) {
    this.window.localStorage.setItem('theme', theme);
  }
}
