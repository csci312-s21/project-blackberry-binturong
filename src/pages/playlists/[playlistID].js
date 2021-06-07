import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout.js";
import PlaylistDetails from "../../components/PlaylistDetails.js";

export default function PlaylistDisplay() {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [selectedShow, setSelectedShow] = useState();
  const router = useRouter();

  useEffect(() => {
    const getPlaylist = async () => {
      const { playlistID } = router.query;
      const response = await fetch(`/api/playlists/${playlistID}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const playlist = await response.json();
      setSelectedPlaylist(playlist);
    };

    if (router.isReady) {
      getPlaylist();
    }
  }, [router.isReady]);

  useEffect(() => {
    const getShow = async () => {
      const response = await fetch(`/api/shows/${selectedPlaylist.showId}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const show = await response.json();

      setSelectedShow(show);
    };

    if (selectedPlaylist) {
      getShow();
    }
  }, [selectedPlaylist]);

  return (
    <Layout
      title={
        selectedShow ? `${selectedShow.title} | WRMC 91.1 FM` : "WRMC 91.1 FM"
      }
    >
      <main>
        {selectedPlaylist && (
          <PlaylistDetails
            playlist={selectedPlaylist}
            currShow={selectedShow}
          />
        )}
      </main>
    </Layout>
  );
}
