import nc from 'next-connect';
import { 
  getDJNames,
  getAllShows,
  getShow,
  getShowPlaylists,
  addPlaylist,
  getPlaylistSongs,
  addSong,
  deleteSong,
  updateSong,
  verifyEmail} from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;

    const show = await getShow(id);
    if (show) {
      res.status(200).json(show);
    } else {
      res.status(404).end(`Show with id ${id} not found`);
    }
  })

  export default handler;