import { Match } from "./match.interface";

export interface MatchDay {
    id: number;
    round: string;
    matches: Match[];
}