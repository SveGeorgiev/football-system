import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeasonService } from 'src/app/services/season.service';
import { Match } from 'src/app/shared/interfaces/match.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public seasonName: string = '';
  public match: Match;

  constructor(
    private route: ActivatedRoute,
    private seasonService: SeasonService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const matchDayId = +params.get('matchDayId')!;
      const matchId = +params.get('matchId')!;
      const { name, matchDayGroup: { matches } } = this.seasonService.getMatchDay(matchDayId);
      this.seasonName = name;
      this.match = matches?.find((match: Match) => match.id === matchId) || {};
    });
  }

}
