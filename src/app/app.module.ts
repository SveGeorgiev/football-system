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
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import { DetailsComponent } from './pages/details/details.component';
import { SeasonComponent } from './pages/season/season.component';
import { SearchComponent } from './shared/components/search/search.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { SelectComponent } from './shared/components/select/select.component';

const materialModules = [
  MatInputModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
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
    SelectComponent,
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
