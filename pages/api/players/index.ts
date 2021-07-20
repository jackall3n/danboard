import { take } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getMatch } from "utils/getMatch";
import { getPlayers } from "utils/getPlayers";
import { getStats } from "utils/getStats";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const names = request.query.names as string[];

  const players = [];

  for (const player of await getPlayers(names)) {
    const _player: any = {
      id: player.id,
      ...player.attributes,
    };

    _player.stats = await getStats(player.id);

    const matches = [];

    for (const match of take(player?.relationships?.matches?.data ?? [], 5) as any[]) {
      const _match = await getMatch(match.id);

      const stats = _match.included.find(
        (i) =>
          i.type === "participant" && i.attributes.stats.playerId === player.id
      )?.attributes.stats;

      delete _match.included;
      delete _match.data.relationships;

      matches.push({
        id: match.id,
        ..._match.data.attributes,
        stats,
      });
    }

    _player.matches = matches;

    players.push(_player);
  }

  response.json(players);
};
