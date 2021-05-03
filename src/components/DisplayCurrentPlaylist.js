/*

  This Component will display the current playlists.

  props - current playlist
*/

import { showType } from "../lib/types.js";

export default function DisplayCurrentPlaylist({ playlist }){

const playlistExists = (typeof playlist !== "undefined");
const currentPlaylist = {playlistExists ? playlist : currentPlaylist}
console.(currentPlaylist);
  return (
    <div>
      
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType.isRequired
};

