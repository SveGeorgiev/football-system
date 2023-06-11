import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { DetailsComponent } from './pages/details/details.component';
import { SeasonComponent } from './pages/season/season.component';
import { SearchComponent } from './shared/search/search.component';
import { MatchesComponent } from './pages/matches/matches.component';

const materialModules = [
  MatInputModule,
  FormsModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    SeasonComponent,
    SearchComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
