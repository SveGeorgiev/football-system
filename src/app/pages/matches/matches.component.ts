import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatchesService } from 'src/app/services/matches.service';

import { groupBy } from 'lodash'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public name = '';
  public matchDays = [];

  constructor(
    private matchesService: MatchesService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.matchesService.getMatches().subscribe((result: any) => {
      const { name, matches } = result
      const grouped = groupBy(matches, 'date')
      this.matchDays = Object.values(grouped).reduce((acc, curr: any) => {
        const [first] = curr || {}
        const { round, date } = first
        const matches = curr.map((v) => ({ team1: v.team1, team2: v.team2, score: v?.score }))
        return [...acc, { round, date, matches }]
      }, [])
      this.name = name;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
