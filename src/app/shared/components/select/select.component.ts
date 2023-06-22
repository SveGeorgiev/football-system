import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { League } from '../../interfaces/league.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Output() selection: EventEmitter<string> = new EventEmitter<string>();

  @Input() label: string = '';
  @Input() selectValue: number = 1;
  @Input() options: League[] = [];

  constructor() { }

  public onSelect(event: MatSelectChange) {
    this.selection.emit(event.value)
  }
}
