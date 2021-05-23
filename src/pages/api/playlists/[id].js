import nc from "next-connect";
import { addPlaylist, updatePlaylist } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .post(async (req, res) => {
    const newPlaylist = req.body;
    const playlist = await addPlaylist(newPlaylist);
    res.status(200).json(playlist);
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const newPlaylist = req.body;
    const success = await updatePlaylist(newSong);

    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`Playlist with id ${id} not found`);
    }
  });

export default handler;