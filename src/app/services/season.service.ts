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
   * Fetches the season data from the API endpoint.
   * @returns An Observable of type 'Season' representing the fetched season data.
   */
  private fetchSeason(): Observable<Season> {
    // Construct the URL for the API request
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`;

    return this.http.get(getURL).pipe(
      map((response: any) => {
        // Map the response data to the desired format
        const mapped = this.mapDataResponse(response);
        const grouped = this.groupMatchDays(mapped);
        // Group the matches by round
        return grouped;
      })
    );
  }

  /**
   * Maps the response data received from the API request.
   * @param response The response data received from the API request.
   * @returns The mapped data with transformed matches array.
   */
  private mapDataResponse(response: any) {
    return {
      ...response,
      matches: response.matches.map((match: Match, index: number) => {
        // Add 'id' property with a unique value and format the 'date' property
        return {
          ...match,
          id: index + 1,
          date: moment(match.date).utc().format('LL')
        };
      })
    };
  }

  /**
   * Groups the matches by their round.
   * @param response The season data to process
   * @returns The season data with grouped match days
   */
  private groupMatchDays(response: Season): Season {
    const { matches } = response;
    const grouped = groupBy(matches, 'round');
    const matchDayGroup = Object.values(grouped).reduce((acc: any, matches: Match[], index: number) => {
      const [first] = matches || {};
      return [...acc, { id: index + 1, round: first.round, matches }];
    }, []);
    return { ...response, matchDayGroup };
  }
}
