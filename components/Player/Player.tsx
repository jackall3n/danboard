import React from "react";
import classnames from "classnames";

import { IPlayer } from "types/Player";

import Character from "./Character";
import Stat from "./Stat";

interface Props {
  player: IPlayer;
}

function Player({ player }: Props) {
  const { display_name, stats, image, error, loading } = player;

  return (
    <div className="rounded-3xl bg-gray-800 w-72 mx-auto shadow-2xl flex flex-col">
      <div
        className={classnames("rounded-t-3xl relative h-44 transition-all", {
          [player.color]: !loading,
          "bg-gray-600": loading,
        })}
      >
        <Character src={image} show={!loading} />

        <div
          className={classnames(
            "ml-6 pt-4 uppercase font-bold text-5xl relative z-20 font-main transition duration-1000 text-shadow",
            {
              "opacity-100": !loading,
              "opacity-0": loading,
            }
          )}
        >
          {display_name.split(/[_ ]/).map((letter, index) => (
            <div key={index}>{letter}</div>
          ))}
        </div>

        <div
          className="
                absolute
                z-10
                bottom-0
                right-0
                left-0
                gradient
                h-32
                opacity-50
              "
        />
      </div>

      <div className="gradient-bg rounded-b-3xl flex flex-col flex-1">
        <div className="grid grid-cols-5 border-b border-t border-black border-opacity-30">
          {stats.matches.map((match) => (
            <div
              key={match.id}
              className="flex justify-center items-center px-3 py-1.5 border-r border-gray-900 last:border-r-0 flex-col leading-tight"
            >
              <div className="font-semibold">{match.stats.winPlace}</div>
              <div className="uppercase text-xs font-bold text-gray-700">
                {match.stats.deathType.replace("by", "")}
              </div>
            </div>
          ))}
        </div>

        {error ||
          (stats.stats.error && (
            <div className="text-center text-sm py-1 font-main tracking-wider">
              {error || stats.stats.error}
            </div>
          ))}

        <div className="grid grid-cols-3 gap-4 py-4 pb-5 px-1 flex-1">
          <Stat title="Wins" value={stats.stats.wins} loading={loading} />
          <Stat title="Played" value={stats.stats.played} loading={loading} />
          <Stat title="Top 10" value={stats.stats.top10s} loading={loading} />
          <Stat title="Kills" value={stats.stats.kills} loading={loading} />
          <Stat
            title="K/D"
            value={stats.stats.kd?.toFixed(1)}
            loading={loading}
          />
          <Stat title="Revives" value={stats.stats.revives} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Player;
