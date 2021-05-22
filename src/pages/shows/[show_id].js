import { useRouter } from "next/router";

import shows from "../../../data/shows.json";
import playlists from "../../../data/playlists.json";

import Layout from "../../components/Layout.js";
import ShowDetails from "../../components/ShowDetails.js";

export default function ShowDisplay() {
  const router = useRouter();
  const { show_id } = router.query;

  const selectedShow = shows.find((show) => show.id === +show_id);

  return (
    <Layout title={selectedShow ? `${ selectedShow.title} | WRMC 91.1 FM` : "WRMC 91.1 FM"}>
      <main>{selectedShow && <ShowDetails show={selectedShow} playlists={playlists}/>}</main>
    </Layout>
  );
}