/* This uses: 
addSong,
  deleteSong,
  updateSong,
*/

import nc from "next-connect";
import { addSong, deleteSong, updateSong } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .delete(async (req, res) => {
    const { id } = req.query;
    const success = await deleteSong(id);
    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`Song with id ${id} not found`);
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const newSong = req.body;
    const success = await updateSong(newSong);

    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end(`Song with id ${id} not found`);
    }
  })
  .post(async (req, res) => {
    const newSong = req.body;
    const song = await addSong(newSong);
    res.status(200).json(song);
  });
  

  export default handler;