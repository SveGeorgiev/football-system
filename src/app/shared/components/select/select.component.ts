import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { League } from '../../interfaces/league.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Output() onSelection: EventEmitter<string> = new EventEmitter<string>();

  @Input() label: string = '';
  @Input() selectValue: number = NaN;
  @Input() options: League[] = [];

  public onSelect = (event: MatSelectChange) => this.onSelection.emit(event.value)

  public trackBy = (index: number, item: any): number => item.id;
}
