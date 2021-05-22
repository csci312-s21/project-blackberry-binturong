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

const handler = nc().get(async (req, res) => {
  const shows = await getAllShows();
  console.log(shows);
  console.log("yooo");
  res.status(200).json(shows);
});

export default handler;
