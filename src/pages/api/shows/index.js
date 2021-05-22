import nc from "next-connect";
import { getAllShows } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const shows = await getAllShows();
  res.status(200).json(shows);
});

export default handler;
