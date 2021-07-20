import { IStats } from "types/Stats";
import PubgService from "../services/PubgService";

export async function getStats(id: string): Promise<any> {
  try {
    const playerStats = await PubgService.stats(id);

    const gameModeStats = playerStats?.data.attributes.gameModeStats;

    const stats = Object.values(gameModeStats).reduce(
      (totals: any, mode: any) => {
        const played = mode.roundsPlayed ?? 0;

        return {
          wins: totals.wins + mode.wins,
          played: totals.played + played,
          losses: totals.losses + mode.losses,
          revives: totals.revives + mode.revives,
          top10s: totals.top10s + mode.top10s,
          kills: totals.kills + mode.kills,
        };
      },
      {
        wins: 0,
        losses: 0,
        played: 0,
        revives: 0,
        top10s: 0,
        kills: 0,
        kd: 0,
      }
    ) as IStats;

    stats.kd = stats.kills / stats.losses;

    return stats;
  } catch (e) {
    return {
      status: e.response.status,
      error: e.message,
    };
  }
}
