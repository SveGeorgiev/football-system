import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Constants from '../shared/constants'

@Injectable({ providedIn: 'root' })
export class MatchesService {

  constructor(private http: HttpClient) { }

  getMatches() {
    const getURL = `${Constants.BASE_URL_API}/master/2020-21/en.1.json`
    return this.http.get(getURL)
  }
}
