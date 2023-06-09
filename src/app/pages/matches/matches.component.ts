/**
 * Component representing the Matches section.
 */
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

  /**
   * Retrieves the description for a list of matches.
   * @param matches The list of matches.
   * @returns The description string.
   */
  public getDescription(matches: Match[]): string {
    const [first, ...rest] = matches;
    const { date } = first;
    const lastDate = rest.pop()?.date;

    return isNil(lastDate) || date === lastDate ? date : `${date} - ${lastDate}`;
  }

  /**
   * Tracks the items in a list by their index.
   * @param index The index of the item.
   * @param item The item object.
   * @returns The unique identifier for the item.
   */
  public trackBy = (index: number, item: any): number => item.id;
}
