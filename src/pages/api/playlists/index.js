
import nc from "next-connect";
import { getAllPlaylists, addPlaylist } from "../../../lib/backend-utils";

const handler = nc()
  .get(async (req, res) => {
    const playlists = await getAllPlaylists();
    res.status(200).json(playlists);
  })
  .post(async (req, res) => {
    const newPlaylist = req.body;
    const playlist = await addPlaylist(newPlaylist);
    res.status(200).json(playlist);
  });

export default handler;