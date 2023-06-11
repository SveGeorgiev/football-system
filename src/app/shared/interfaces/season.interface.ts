import { Match } from "./match.interface";
import { MatchDay } from "./matchday.interface";

export interface Season {
    name: string,
    matches?: Match[];
    matchDayGroup?: MatchDay[];
}