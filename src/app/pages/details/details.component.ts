import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public seasonName: string = '';
  public match: any = {};

  constructor(
    private route: ActivatedRoute,
    private matchesService: MatchesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const matchDayId = +params.get('matchDayId');
      const matchId = +params.get('matchId');
      const { name, matchDayGroup: { matches } } = this.matchesService.getMatchDay(matchDayId);
      this.seasonName = name;
      this.match = matches.find(v => v.id === matchId) || {};
    });
  }

}
