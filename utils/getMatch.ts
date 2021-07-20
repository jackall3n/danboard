import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0ZjgwNTM0MC1jN2E2LTAxMzktYTM0NC0wMDcyZjk3OGJkYWQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjI2MzU5MDc4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImRhbmJvYXJkIn0.y70nEgSZVCsnA3XJMwQw-NeiDouk_BWKEFIyzVAAcu8";

export async function getMatch(id:  string): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.pubg.com/shards/steam/matches/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    return {
      status: e.response.status,
      error: e.message,
    };
  }
}
