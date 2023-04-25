import { Component, Input } from '@angular/core';

@Component({
  selector: 'dq-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardTitle: string = '';
}
