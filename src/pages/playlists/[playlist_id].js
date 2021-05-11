import { useRouter } from "next/router";

import shows from "../../../data/shows.json";
import playlists from "../../../data/playlists.json";

import Layout from "../../components/Layout.js";
import PlaylistDetails from "../../components/PlaylistDetails.js";

export default function PlaylistDisplay() {
  const router = useRouter();
  const { playlist_id } = router.query;

  const selectedPlaylist = playlists.find((playlist) => playlist.id === +playlist_id);
  
  const selectedShow = shows.find((show) => show.id === selectedPlaylist.showID);

  return (
    <Layout title={`${show.title} | WRMC 91.1 FM`}>
      <main>{selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} songs={allSongs} currShow={selectedShow} />}</main>
    </Layout>
  );
};