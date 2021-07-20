import axios, { AxiosInstance } from "axios";

class PubgService {
  private client: AxiosInstance;

  constructor(platform: string) {
    this.client = axios.create({
      baseURL: `https://api.pubg.com/shards/${platform}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PUBG_ACCESS_TOKEN}`,
      },
    });
  }

  async players(names: string | string[]) {
    const { data } = await this.client.get("players", {
      params: {
        "filter[playerNames]": Array.isArray(names) ? names.join(",") : names,
      },
    });

    return data.data;
  }

  async stats(id: string) {
    const { data } = await this.client.get(`/players/${id}/seasons/lifetime`);

    return data;
  }
}

export default new PubgService("steam");
