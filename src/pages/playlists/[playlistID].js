import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout.js";
import PlaylistDetails from "../../components/PlaylistDetails.js";

export default function PlaylistDisplay() {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const router = useRouter();
  const { playlistID } = router.query;

  useEffect(() => {
    const getPlaylist = async () => {
      const { playlistID } = router.query;
      const response = await fetch(`/api/playlists/${playlistID}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const playlist = await response.json();
      setSelectedPlaylist(playlist);
    }
    if (router.isReady ===true) {
      getPlaylist();
    }
  }, [router.isReady]);
  
  //const selectedShow = selectedPlaylist && shows.find((show) => show.id === selectedPlaylist.showId);

  return (
    <Layout >
      <main>{selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist}/>}</main>
    </Layout>
  );
}


//title={selectedShow ? `${selectedShow.title} | WRMC 91.1 FM` : "WRMC 91.1 FM"}