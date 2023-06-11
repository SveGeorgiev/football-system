import { Component, Input } from '@angular/core';

import { isNil } from 'lodash';
import { Match } from 'src/app/shared/interfaces/match.interface';
import { MatchDay } from 'src/app/shared/interfaces/matchday.interface';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  @Input() matchDays: MatchDay[] = [];
  public panelOpenState: boolean = false;

  public getDescription(matches: Match[]) {
    const [first, ...rest] = matches;
    const { date } = first;
    const lastDate = rest.pop()?.date;

    return isNil(lastDate) || date === lastDate ? date : `${date} - ${lastDate}`;
  }

  public trackBy(index: number, item: any): number {
    return item.id;
  }
}
