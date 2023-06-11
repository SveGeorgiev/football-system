/**
 * Component representing the Season page.
 */
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

  /**
 * Constructs the SeasonComponent.
 * @param seasonService The service for retrieving season data.
 * @param errorHandlingService The service for error handling.
 */
  constructor(
    private seasonService: SeasonService,
    private errorHandlingService: ErrorHandlingService
  ) { }

  /**
 * Lifecycle hook that is called after the component has been initialized.
 * It retrieves the season data.
 */
  ngOnInit(): void {
    this.getSeason();
  }

  /**
 * Lifecycle hook that is called when the component is about to be destroyed.
 * It unsubscribes from any active subscriptions.
 */
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  /**
 * Retrieves the season data from the season service.
 * Sets the component properties based on the retrieved data.
 */
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

  /**
 * Retrieves the error message from the error handling service.
 * @returns The error message.
 */
  public getErrorMessage(): string {
    return this.errorHandlingService.getErrorMessage();
  }

  /**
 * Handles the search event and filters the match day group based on the search query.
 * @param query The search query.
 */
  public onSearch(query: string): void {
    const searchText = query.trim().toLowerCase();
    searchText === ''
      ? this.filteredItems = this.matchDayGroup
      : this.filteredItems = this.getFiltredData(searchText);
  }

  /**
 * Filters the match day group based on the search query.
 * @param searchText The search query.
 * @returns The filtered match day group.
 */
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
