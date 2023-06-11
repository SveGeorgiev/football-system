import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, of } from 'rxjs';
import { groupBy, isNil } from 'lodash';
import * as moment from 'moment';

import Constants from '../shared/constants'
import { Season } from '../shared/interfaces/season.interface';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private seasonCashed: Season;

  constructor(private http: HttpClient) { }

  public getMatches() {
    if (isNil(this.seasonCashed)) { return this.fetchSeason(); }
    return of(this.seasonCashed);
  }

  public setMatches(matches) {
    this.seasonCashed = matches;
  }

  public getMatchDay(matchDayId): any {
    return {
      ...this.seasonCashed,
      matchDayGroup: this.seasonCashed?.matchDayGroup.find(v => v.id === matchDayId) || []
    };
  }

  private fetchSeason(): Observable<Season> {
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`;
    return this.http.get(getURL).pipe(map((response: Season) => {
      return this.groupMatchDays(response);
    }))
  }

  private groupMatchDays(response) {
    const { matches } = response;
    const grouped = groupBy(matches, 'round');
    const matchDayGroup = Object.values(grouped).reduce((acc, curr: any, index) => {
      const [first] = curr || {};
      const matches = curr.map((v, matchIndex) => ({
        id: matchIndex + 1,
        ...v,
        date: moment(v.date).utc().format('LL')
      }));
      return [...acc, { id: index + 1, round: first.round, matches }];
    }, []);
    return { ...response, matchDayGroup };
  }
}
