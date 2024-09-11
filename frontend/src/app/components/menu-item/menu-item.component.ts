import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Input() translateKey: string = '';
  @Input() checked: boolean = false;

  constructor() {}
}
