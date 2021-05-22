import nc from "next-connect";
import { getPlaylistSongs } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .get(async (req, res) => {
      const { id } = req.query;
      const song = await getPlaylistSongs(id);
      if (song) {
        res.status(200).json(song);
      } else {
        res.status(404).end(`Show with id ${id} not found`);
      }
    })

    export default handler;