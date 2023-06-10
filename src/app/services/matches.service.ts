import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Constants from '../shared/constants'
import { Observable, map, of } from 'rxjs';
import { groupBy, isNil } from 'lodash';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class MatchesService {
  private matchesCashed: any;

  constructor(private http: HttpClient) { }

  public getMatches() {
    if (isNil(this.matchesCashed)) { return this.fetchMatches(); }
    return of(this.matchesCashed);
  }

  public setMatches(matches) {
    this.matchesCashed = matches;
  }

  public getMatchDay(matchDayId) {
    return {
      ...this.matchesCashed,
      matchDayGroup: this.matchesCashed?.matchDayGroup.find(v => v.id === matchDayId) || []
    };
  }

  private fetchMatches(): Observable<any> {
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`;
    return this.http.get(getURL).pipe(map((response: any) => {
      const { name, matches } = response;
      const matchDayGroup = this.getMatchDayGroup(matches);
      return { name, matchDayGroup };
    }))
  }

  private getMatchDayGroup(matches) {
    const grouped = groupBy(matches, 'round');
    return Object.values(grouped).reduce((acc, curr: any, index) => {
      const [first] = curr || {};
      const matches = curr.map((v, matchIndex) => ({
        id: matchIndex + 1,
        ...v,
        date: moment(v.date).utc().format('LL')
      }));
      return [...acc, { id: index + 1, round: first.round, matches }];
    }, []);
  }
}
