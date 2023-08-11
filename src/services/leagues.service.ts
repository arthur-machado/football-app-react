import { API } from "./api";

export async function getLeagues() {
  try {
    const response = await API.get("/leagues");
    return response.data;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getLeagueStandings(
  leagueId: string,
  season: number,
  sort: string
) {
  try {
    const response = await API.get(
      `/leagues/${leagueId}/standings?season=${season}&sort=${sort}`
    );

    return response.data;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getLeagueSeasons(leagueId: string) {
  try {
    const response = await API.get(`/leagues/${leagueId}/seasons`);
    return response.data;
  } catch (err) {
    throw new Error(err as string);
  }
}
