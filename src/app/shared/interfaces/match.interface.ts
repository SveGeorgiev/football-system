import { Score } from "./score.interface";

export interface Match {
    id: number;
    round: string;
    date: string;
    team1: string;
    team2: string;
    score?: Score;
}