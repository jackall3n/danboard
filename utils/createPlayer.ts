import { IStats } from "types/Stats";

export function createPlayer(
  name: string,
  id: string,
  image: StaticImageData,
  color: string,
  display_name = name
) {
  return {
    id,
    name,
    display_name,
    image,
    stats: {
      matches: [],
      stats: {
        wins: undefined,
        losses: undefined,
        played: undefined,
        kills: undefined,
        revives: undefined,
        top10s: undefined,
        error: undefined,
      } as IStats,
    },
    color,
    error: undefined,
    loading: true,
  };
}
