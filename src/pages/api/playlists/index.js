
import nc from "next-connect";
import { getAllPlaylists } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const playlists = await getAllPlaylists();
  res.status(200).json(playlists);
});

export default handler;