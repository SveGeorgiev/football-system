import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchesComponent } from './pages/matches/matches.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: 'matches', component: MatchesComponent, data: { label: 'matches' } },
  { path: 'details/:matchDayId/:matchId', component: DetailsComponent, data: { label: 'details' } },
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: '**', component: MatchesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
