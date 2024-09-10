import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  Quit,
  WindowFullscreen,
  WindowIsMaximised,
  WindowMinimise,
  WindowSetAlwaysOnTop,
  WindowToggleMaximise,
  WindowUnfullscreen,
} from '@wailsjs/runtime/runtime';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { delay, of } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { Theme, ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [ButtonModule, TooltipModule, MenuModule, TranslateModule],
  providers: [ConfirmationService],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css',
})
export class TitleBarComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private langulageService: LanguageService,
    private translateService: TranslateService,
  ) {}

  isMaximized = false;
  isFullscreen = false;
  isAlwaysOnTop = false;

  langsMenuItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed:', event.lang);
      this.langsMenuItems = this.langulageService.langs.map(lang => ({
        label: lang.label,
        icon: event.lang === lang.id ? PrimeIcons.CHECK : undefined,
        command: () => this.toggleLanguage(lang.id),
      }));
    });
  }

  get themeIcon() {
    return this.themeService.theme === 'system'
      ? PrimeIcons.PALETTE
      : this.themeService.theme === 'dark'
        ? PrimeIcons.MOON
        : PrimeIcons.SUN;
  }

  get theme(): Theme {
    return this.themeService.theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  minimize() {
    WindowMinimise();
  }

  toggleMaximize() {
    WindowToggleMaximise();

    of(this.isMaximized)
      .pipe(delay(200))
      .subscribe(() => {
        WindowIsMaximised().then(maximized => {
          this.isMaximized = maximized;
        });
      });
  }

  quit() {
    Quit();
  }

  fullscreen() {
    this.isFullscreen ? WindowUnfullscreen() : WindowFullscreen();
    this.isFullscreen = !this.isFullscreen;
  }

  setAlwaysOnTop() {
    this.isAlwaysOnTop = !this.isAlwaysOnTop;
    WindowSetAlwaysOnTop(this.isAlwaysOnTop);
  }

  toggleLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
