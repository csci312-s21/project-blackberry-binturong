import nc from "next-connect";
import { getPlaylist, updatePlaylist } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;
    const playlist = await getPlaylist(+id);

    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).end(`Playlist with id ${id} not found`);
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const newPlaylist = req.body;
    const success = await updatePlaylist(newPlaylist);

    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`Playlist with id ${id} not found`);
    }
  });

export default handler;