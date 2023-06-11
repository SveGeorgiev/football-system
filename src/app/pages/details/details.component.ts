import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SeasonService } from 'src/app/services/season.service';
import { Match } from 'src/app/shared/interfaces/match.interface';
import { Season } from 'src/app/shared/interfaces/season.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public match?: Match;

  constructor(
    private route: ActivatedRoute,
    private seasonService: SeasonService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const matchId = +params.get('matchId')!;
      this.subs.push(this.seasonService.getSeason().subscribe((season: Season) => {
        this.match = season.matches?.find((match: Match) => match.id === matchId);
      }));
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
