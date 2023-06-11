import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SeasonService } from 'src/app/services/season.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { MatchDay } from 'src/app/shared/interfaces/matchday.interface';
import { Season } from 'src/app/shared/interfaces/season.interface';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public name: string = '';
  public matchDayGroup: MatchDay[] = [];
  public filteredItems: MatchDay[] = [];
  public isLoading: boolean = true;
  public panelOpenState: boolean = false;

  constructor(
    private seasonService: SeasonService,
    private errorHandlingService: ErrorHandlingService
  ) { }

  ngOnInit(): void {
    this.getSeason();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private getSeason(): void {
    this.subs.push(this.seasonService.getSeason().subscribe(
      {
        next: (season: Season) => {
          this.seasonService.setSeason(season);
          const { name, matchDayGroup } = season;
          this.name = name;
          this.matchDayGroup = matchDayGroup || [];
          this.filteredItems = matchDayGroup || [];
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          this.errorHandlingService.setErrorMessage('An error occurred during the API request.');
          console.log(error);
        }
      }));
  }

  public getErrorMessage(): string {
    return this.errorHandlingService.getErrorMessage();
  }

  public onSearch(query: string): void {
    const searchText = query.trim().toLowerCase();
    searchText === ''
      ? this.filteredItems = this.matchDayGroup
      : this.filteredItems = this.getFiltredData(searchText);
  }

  private getFiltredData(searchText: string): MatchDay[] {
    return this.matchDayGroup.reduce((acc: MatchDay[], curr: MatchDay) => {
      const { matches } = curr;
      const matchesFiltered = matches.filter(m => {
        const combinedDataText = `${m.round} ${m.date} ${m.team1} ${m.team2}`.toLowerCase()
        const withScore = m?.score
          ? `${combinedDataText} ${m?.score.ft[0]}:${m?.score.ft[1]}`
          : combinedDataText;
        return withScore.includes(searchText);
      });
      return matchesFiltered.length
        ? [...acc, { ...curr, matches: matchesFiltered }]
        : acc;
    }, []);
  }
}
