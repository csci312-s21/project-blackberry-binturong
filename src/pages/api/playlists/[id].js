import nc from "next-connect";
import { addPlaylist } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .post(async (req, res) => {
    const newPlaylist = req.body;
    const playlist = await addPlaylist(newPlaylist);
    res.status(200).json(playlist);
  });

  export default handler;