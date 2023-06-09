import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatchesService } from 'src/app/services/matches.service';
import Seasons from '../../shared/seasons'

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public name = '';
  public matchDayGroup = [];
  public seasons: any = [];
  public panelOpenState = false;

  constructor(
    private matchesService: MatchesService
  ) { }

  ngOnInit(): void {
    this.seasons = Seasons

    this.subs.push(this.matchesService.getMatches().subscribe((result: any) => {
      const { name, matchDayGroup } = result
      this.name = name;
      this.matchDayGroup = matchDayGroup
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public getDescription(matches) {
    const [first, ...rest] = matches;
    const lastDate = rest.pop().date;
    return first.date === lastDate
      ? first.date
      : `${first.date} - ${lastDate}`;
  }
}
