import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useLoading } from "../contexts/LoadingContext";

import {
  getLeagueSeasons,
  getLeagueStandings,
} from "../services/leagues.service";

import { Header } from "../components/Header";
import { Table, Standings } from "../components/Table";
import { Select } from "../components/Select";
import { Spinner } from "../components/Spinner";

interface League {
  name: string;
  seasonDisplay: string;
  standings: Standings[];
}

interface Season {
  year: number;
}

export function LeagueStandings() {
  const [league, setLeague] = useState<League>();
  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const navigate = useNavigate();
  const { leagueId } = useParams();

  const { isLoading, setLoadingState } = useLoading();

  const getStandingsByLeague = async () => {
    setLoadingState(true);
    const response =
      leagueId &&
      (await getLeagueStandings(leagueId, parseInt(selectedSeason), "asc"));
    setLeague(response.data);
    setLoadingState(false);
  };

  const getSeasonsByLeague = async () => {
    setLoadingState(true);
    const response = leagueId && (await getLeagueSeasons(leagueId));
    setSeasons(response.data.seasons.map((item: Season) => String(item.year)));
    setLoadingState(false);
  };

  const handleChangeSelectedYear = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSelectedSeason(event.target.value);
  };

  useEffect(() => {
    if (selectedSeason?.length) getStandingsByLeague();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason]);

  useEffect(() => {
    if (!selectedSeason?.length) setSelectedSeason(seasons[0]);
  }, [seasons, selectedSeason]);

  useEffect(() => {
    getSeasonsByLeague();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return (
    <main className="max-sm:px-4 py-14 px-40">
      <Header />
      <a
        className="cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        ⬅️ Back
      </a>
      <section className="w-full mt-3">
        <div className="flex justify-between">
          <h3 className="font-light text-xl">
            {league?.name} - {league?.seasonDisplay}
          </h3>
          <Select options={seasons} onChange={handleChangeSelectedYear} />
        </div>
        <hr className="my-4" />
        {isLoading ? (
          <div className="my-10 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          league && <Table standings={league?.standings} />
        )}
      </section>
    </main>
  );
}
