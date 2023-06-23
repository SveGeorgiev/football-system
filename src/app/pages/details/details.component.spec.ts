import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { SeasonService } from 'src/app/services/season.service';
import { Match } from 'src/app/shared/interfaces/match.interface';
import { Season } from 'src/app/shared/interfaces/season.interface';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockActivatedRoute: any;
  let mockSeasonService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of({
        get: (param: string) => {
          if (param === 'matchId') {
            return '1'; // mock matchId value
          }
          return null;
        }
      })
    };

    mockSeasonService = {
      getSeason: jasmine.createSpy('getSeason').and.returnValue(of(mockSeasonData()))
    };

    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SeasonService, useValue: mockSeasonService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Helper functions for creating mock data
  function mockSeasonData(): Season {
    return {
      name: 'Premier League 2020/21',
      matches: mockMatchData()
    };
  }

  function mockMatchData(): Match[] {
    return [
      {
        "round": "Matchday 1",
        "date": "September 11, 2020",
        "team1": "Burnley FC",
        "team2": "Manchester United FC",
        "id": 1
      },
      {
        "round": "Matchday 1",
        "date": "September 11, 2020",
        "team1": "Manchester City FC",
        "team2": "Aston Villa FC",
        "id": 2
      },
      {
        "round": "Matchday 1",
        "date": "September 11, 2020",
        "team1": "Fulham FC",
        "team2": "Arsenal FC",
        "score": {
          "ft": [
            0,
            3
          ]
        },
        "id": 3
      }
    ];
  }
});
