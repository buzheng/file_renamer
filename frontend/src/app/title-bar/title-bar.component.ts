import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { delay, from, of } from 'rxjs';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { LanguageService } from '../services/language.service';
import { Theme, ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [ButtonModule, TooltipModule, MenuModule, TranslateModule, MenuItemComponent],
  providers: [ConfirmationService],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css',
})
export class TitleBarComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    private langulageService: LanguageService,
    public translateService: TranslateService,
  ) {}

  isMaximized = false;
  isFullscreen = false;
  isAlwaysOnTop = false;

  langsMenuItems: MenuItem[] | undefined;

  themeMenuItems?: MenuItem[];

  ngOnInit(): void {
    this.langsMenuItems = this.langulageService.langs.map(lang => ({
      label: lang.label,
      command: () => this.toggleLanguage(lang.id),
      id: lang.id,
    }));

    this.themeMenuItems = [
      {
        label: 'System',
        icon: PrimeIcons.DESKTOP,
        command: () => this.themeService.setTheme('system'),
      },
      {
        label: 'Light',
        icon: PrimeIcons.SUN,
        command: () => this.themeService.setTheme('light'),
      },
      {
        label: 'Dark',
        icon: PrimeIcons.MOON,
        command: () => this.themeService.setTheme('dark'),
      },
    ];
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log('resize', event);
    from(WindowIsMaximised()).subscribe(maximized => {
      this.isMaximized = maximized;
    });
  }
}
