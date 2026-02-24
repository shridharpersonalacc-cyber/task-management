import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-check-angular-virtual-scroll',
  standalone: false,
  templateUrl: './check-angular-virtual-scroll.html',
  styleUrl: './check-angular-virtual-scroll.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckAngularVirtualScroll {
  myItems = Array.from({ length: 100 }).map((_, i) => `Item No:${i}`);
}
