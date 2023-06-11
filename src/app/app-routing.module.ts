import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonComponent } from './pages/season/season.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: 'season', component: SeasonComponent, data: { label: 'season' } },
  { path: 'details/:matchId', component: DetailsComponent, data: { label: 'details' } },
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: '**', component: SeasonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
