import { useRouter } from "next/router";

import shows from "../../../data/shows.json";
import playlists from "../../../data/playlists.json";

import Layout from "../../components/Layout.js";
import ShowDetails from "../../components/PlaylistDetails.js";

export default function ShowDisplay() {
  const router = useRouter();
  const { special_id } = router.query;
  console.log(special_id);

  const selectedShow = shows.find((show) => show.id === +special_id);

  return (
    <Layout title={` | WRMC 91.1 FM Middlebury College Radio`}>
      <main>{selectedShow && <ShowDetails show={selectedShow} playlists={playlists}/>}</main>
    </Layout>
  );
};