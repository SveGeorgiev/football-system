import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Constants from '../shared/constants'
import { map } from 'rxjs';
import { groupBy } from 'lodash';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class MatchesService {

  constructor(private http: HttpClient) { }

  public getMatches() {
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`
    return this.http.get(getURL).pipe(map((response: any) => {
      const { name, matches } = response
      const matchDayGroup = this.getMatchDayGroup(matches);
      return { name, matchDayGroup }
    }))
  }

  private getMatchDayGroup(matches) {
    const grouped = groupBy(matches, 'round')
    return Object.values(grouped).reduce((acc, curr: any) => {
      const [first] = curr || {}
      const { round, date } = first
      const matches = curr.map((v) => ({ 
        team1: v.team1, 
        team2: v.team2, 
        score: v?.score, 
        date: moment(v.date).utc().format('LLLL') }))
      return [...acc, { round, date, matches }]
    }, [])
  }
}
