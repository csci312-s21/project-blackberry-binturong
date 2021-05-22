import nc from "next-connect";
import { getShowPlaylists } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;

    const playlist = await getShowPlaylists(id);
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).end(`Playlist with id ${id} not found`);
    }
  })

    export default handler;