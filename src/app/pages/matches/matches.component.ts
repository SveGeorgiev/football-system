import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatchesService } from 'src/app/services/matches.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

import { isNil } from 'lodash';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public name: string = '';
  public matchDayGroup: any[] = [];
  public filteredItems: any[] = [];
  public panelOpenState = false;

  constructor(
    private matchesService: MatchesService,
    private errorHandlingService: ErrorHandlingService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.matchesService.getMatches().subscribe(
      {
        next: (result: any) => {
          this.matchesService.setMatches(result);
          const { name, matchDayGroup } = result;
          this.name = name;
          this.matchDayGroup = matchDayGroup;
          this.filteredItems = matchDayGroup;
        },
        error: error => {
          this.errorHandlingService.setErrorMessage('An error occurred during the API request.');
          console.log(error);
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public getDescription(matches) {
    const [first, ...rest] = matches;
    const { date } = first;
    const lastDate = rest.pop()?.date;

    if (isNil(lastDate)) { return date; }

    return date === lastDate ? date : `${date} - ${lastDate}`;
  }

  public trackBy(index: number, item: any): number {
    return item.id;
  }

  public getErrorMessage() {
    return this.errorHandlingService.getErrorMessage();
  }

  public onSearch(query: any): void {
    const searchText = query.trim().toLowerCase();
    if (searchText === '') {
      this.filteredItems = this.matchDayGroup;
    } else {
      const filtered = this.matchDayGroup.reduce((acc, curr) => {
        const { matches } = curr;
        const matchesFiltered = matches.filter(m => {
          const filterText = `${m.round} ${m.date} ${m.team1} ${m.team2}`.toLowerCase()
          return filterText.includes(query);
        });
        return matchesFiltered.length
          ? [...acc, { ...curr, matches: matchesFiltered }]
          : acc;

      }, [])
      this.filteredItems = filtered;
    }
  }
}
