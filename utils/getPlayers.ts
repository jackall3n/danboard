import PubgService from "services/PubgService";

export async function getPlayers(names: string[] | string): Promise<any> {
  try {
    return await PubgService.players(names);
  } catch (e) {
    return {
      status: e.response.status,
      error: e.message,
    };
  }
}
