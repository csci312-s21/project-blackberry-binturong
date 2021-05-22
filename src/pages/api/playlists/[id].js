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

    const playlist = await getShowPlaylists(id);
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).end(`Playlist with id ${id} not found`);
    }
  })
  .post(async (req, res) => {
    const newPlaylist = req.body;
    const playlist = await addPlaylist(newPlaylist);
    res.status(200).json(playlist);
  });

  export default handler;