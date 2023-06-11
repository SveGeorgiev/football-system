# Football System

The application "football-system" uses several libraries for its development:

Angular: The application is built using the Angular framework, which provides a platform for building web applications with TypeScript.

Angular Material: Angular Material is a UI component library that provides pre-built UI components following the Material Design guidelines. It is used for creating a consistent and visually appealing user interface.

Lodash: Lodash is a utility library that provides helpful functions for manipulating and working with arrays, objects, and other data structures. It is used in the application to simplify tasks such as data filtering and transformation.

Moment.js: Moment.js is a library for parsing, manipulating, and formatting dates and times in JavaScript. It is used in the application to format the match dates.

RxJS: RxJS is a library for reactive programming using Observables. It is used in the application to handle asynchronous operations, such as making HTTP requests and managing data streams.

Node-sass and Sass-loader: These libraries are used for compiling Sass files into CSS. They allow the use of Sass syntax for styling the application.

Zone.js: Zone.js is a library for intercepting and tracking asynchronous operations in JavaScript. It is used in Angular to enable change detection and manage the execution context of asynchronous tasks.

These are some of the key libraries used in the application for various purposes such as UI development, data manipulation, date handling, and asynchronous programming.

## Components

## SeasonComponent

The SeasonComponent is responsible for displaying the Season page. It retrieves season data from the SeasonService, handles error handling through the ErrorHandlingService, and provides search functionality to filter the match day group.

The component implements the OnInit and OnDestroy lifecycle hooks. In the ngOnInit hook, it calls the getSeason method to retrieve the season data. In the ngOnDestroy hook, it unsubscribes from any active subscriptions.

The component has properties for the season name, match day group, filtered items, loading state, and panel state. These properties are updated based on the retrieved season data.

The getErrorMessage method retrieves the error message from the error handling service.

The onSearch method handles the search event and filters the match day group based on the search query.

The getFiltredData method filters the match day group based on the search query.

## MatchesComponent

The MatchesComponent is a component that represents the Matches section. It has an @Input property matchDays of type MatchDay[], which represents the list of match days to display.

The component also has a panelOpenState property that is used to control the state of the panel.

The getDescription method takes a list of matches as input and returns a string representing the description of those matches. It extracts the date from the first match, and if there are other matches in the list, it also extracts the date of the last match. It then compares the dates and constructs the description string accordingly.

The trackBy method is used to track the items in a list by their index. It takes the index and the item object as parameters and returns a unique identifier for the item.

## DetailsComponent

The DetailsComponent is a component that represents the details of a match. It retrieves the matchId parameter from the current route and uses it to fetch the corresponding match details from the SeasonService.

The component has a match property of type Match, which holds the details of the match. The property is optional (match?: Match) to handle cases where the match may not be available.

During initialization (ngOnInit), the component subscribes to the paramMap observable of the ActivatedRoute to get the latest matchId parameter value. It then calls the getSeason method of the SeasonService to retrieve the season details. Once the season details are available, it uses the find method to locate the match with the matching matchId within the matches array of the season. The retrieved match is assigned to the match property.

When the component is being destroyed (ngOnDestroy), it unsubscribes from any active subscriptions to prevent memory leaks.

## Services

## SeasonService

The SeasonService is responsible for fetching and caching season data. It utilizes the HttpClient to make HTTP requests to the API and transforms the retrieved data before returning it.

The service has the following public methods:

getSeason(): Retrieves the season data. If the season data is already cached, it returns the cached data; otherwise, it fetches the season data from the API.

setSeason(season: Season): Caches the provided season data.

The private methods of the service are:

fetchSeason(): Fetches the season data from the API and performs necessary transformations, such as mapping match objects and grouping matches by their round.

groupMatchDays(response: Season): Groups the matches by their round and formats the match dates.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.9.