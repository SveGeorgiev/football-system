import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  public searchValue: string = '';

  public onSearch = (query: any): void => this.searchQuery.emit(query.value);

  public resetSearchValue() {
    this.searchValue = '';
    this.searchQuery.emit(this.searchValue);
  }
}
