import nc from "next-connect";
import { getAllSongs } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const songs = await getAllSongs();
  res.status(200).json(songs);
});

export default handler;