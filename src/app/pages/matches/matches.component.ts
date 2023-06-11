import { Component, Input, OnInit } from '@angular/core';

import { isNil } from 'lodash';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  @Input() matchDays: any[];
  public panelOpenState: boolean = false;

  public getDescription(matches) {
    const [first, ...rest] = matches;
    const { date } = first;
    const lastDate = rest.pop()?.date;

    return isNil(lastDate) || date === lastDate ? date : `${date} - ${lastDate}`;
  }

  public trackBy(index: number, item: any): number {
    return item.id;
  }
}
