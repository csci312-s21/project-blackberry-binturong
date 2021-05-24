import nc from "next-connect";
import { getAllSongs, addSong } from "../../../lib/backend-utils";

const handler = nc()
  .get(async (req, res) => {
    const songs = await getAllSongs();
    res.status(200).json(songs);
  })
  .post(async (req, res) => {
    const newSong = req.body;
    const song = await addSong(newSong);
    res.status(200).json(song);
  });

export default handler;