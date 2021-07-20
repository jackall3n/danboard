import React from "react";

import { IPlayer } from "types/Player";
import Image from "next/image";
import logo from "../../public/images/PUBG_Icon_Color.png";
import Player from "./Player";

interface Props {
  players: IPlayer[];
}

export function Players({ players }: Props) {
  return (
    <div className="relative z-20 flex flex-col justify-center">
      <div className="h-40 mx-auto my-20 flex">
        <Image src={logo} alt="logo" className="object-contain" />
      </div>

      <div
        className="
          grid grid-cols-1
          gap-10
          mb-10
          md:grid-cols-2
          lg:grid-cols-3
          mx-auto
          flex-1
        "
      >
        {players.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default Players;
