/**
 * Service responsible for fetching and caching season data.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, of } from 'rxjs';
import { groupBy, isNil } from 'lodash';
import * as moment from 'moment';

import Constants from '../shared/constants';
import { Season } from '../shared/interfaces/season.interface';
import { Match } from '../shared/interfaces/match.interface';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private seasonCached?: Season;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the season data.
   * If the season data is already cached, it returns the cached data.
   * Otherwise, it fetches the season data from the API.
   * @returns Observable<Season> The season data
   */
  public getSeason(): Observable<Season> {
    if (isNil(this.seasonCached)) {
      return this.fetchSeason();
    }
    return of(this.seasonCached);
  }

  /**
   * Caches the provided season data.
   * @param season The season data to cache
   */
  public setSeason(season: Season): void {
    this.seasonCached = season;
  }

  /**
   * Fetches the season data from the API and performs necessary transformations.
   * @returns Observable<Season> The transformed season data
   */
  private fetchSeason(): Observable<Season> {
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`;
    return this.http.get(getURL).pipe(
      map((response: any) => {
        const mapped = {
          ...response,
          matches: response.matches.map((m: Match, index: number) => ({ ...m, id: index + 1 }))
        };
        return this.groupMatchDays(mapped);
      })
    );
  }

  /**
   * Groups the matches by their round and formats the match dates.
   * @param response The season data to process
   * @returns The season data with grouped match days
   */
  private groupMatchDays(response: Season): Season {
    const { matches } = response;
    const grouped = groupBy(matches, 'round');
    const matchDayGroup = Object.values(grouped).reduce((acc: any, curr: Match[], index: number) => {
      const [first] = curr || {};
      const matches = curr.map((m: Match) => ({ ...m, date: moment(m.date).utc().format('LL') }));
      return [...acc, { id: index + 1, round: first.round, matches }];
    }, []);
    return { ...response, matchDayGroup };
  }
}
