import { NextApiRequest } from "next";
import { getStats } from "utils/getStats";

export default async (req: NextApiRequest, res: any) => {
  const stats = await getStats(req.query.id as string);

  if (stats.error) {
    res.status(stats.status).json(stats);
  } else {
    res.json(stats);
  }
};
