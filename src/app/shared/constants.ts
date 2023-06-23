import { SeasonPayload } from "./interfaces/season-payload.interface";

const BASE_URL = 'http://localhost:4200'
const BASE_URL_API = 'https://raw.githubusercontent.com/openfootball/football.json'

const DEFAULT_SEASON_PAYLOAD: SeasonPayload = { seasonId: 20, leagueId: 1 };

export default {
    BASE_URL,
    BASE_URL_API,
    DEFAULT_SEASON_PAYLOAD
}