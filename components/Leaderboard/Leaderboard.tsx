import React, { useEffect, useState } from "react";
import axios from "axios";
import { cloneDeep, orderBy } from "lodash";

import Players from "components/Player/Players";
import { IPlayer } from "types/Player";

interface Props {
  players: IPlayer[];
}

export default function Leaderboard({ players: PLAYERS }: Props) {
  const [players, setPlayers] = useState(PLAYERS);

  async function stats() {
    // Clone because mutations are shite
    let _players = cloneDeep(players);

    try {
      const { data } = await axios.get(`/api/players`, {
        params: {
          names: _players.map((p) => p.name).join(","),
        },
      });

      for (const player of _players) {
        player.stats = data.find((d) => d.id === player.id);
        player.error = undefined;
        player.loading = false;
      }
    } catch (e) {
      // Add the error to all the people even though it's a lie and only this one might have failed.
      _players.forEach((p) => (p.error = "Rate limit reached"));
    }

    console.log(_players);

    // Temporary sorting algorithm to ensure burst_nasty is always 2nd
    _players = orderBy(
      _players,
      [
        (player: any) => player.stats.stats.wins / player.stats.stats.played,
        "stats.stats.wins",
        "stats.stats.top10s",
      ],
      ["desc", "desc", "desc"]
    );

    setPlayers(_players);
  }

  useEffect(() => {
    // Make it animate in, but like not all shit cause of screen load timez
    setTimeout(stats, 2000);
  }, []);

  return (
    <div className="relative flex-1 text-white overflow-hidden">
      <video
        loop
        muted
        autoPlay
        poster="https://pubgisd-cdn.akamaized.net/live/global-account-management/assets/img/account-login.jpg"
        className="
        absolute
        top-0
        left-0
        right-0
        bottom-0
        min-h-full
        object-cover
        z-10
      "
      >
        <source
          src="https://pubgisd-cdn.akamaized.net/live/global-account-management/assets/video/account-login.webm"
          type="video/webm"
        />
        <source
          src="https://pubgisd-cdn.akamaized.net/live/global-account-management/assets/video/account-login.mp4"
          type="video/mp4"
        />
      </video>

      <Players players={players} />
    </div>
  );
}
