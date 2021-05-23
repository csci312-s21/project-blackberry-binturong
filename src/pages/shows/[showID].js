import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "../../components/Layout.js";
import ShowDetails from "../../components/ShowDetails.js";

export default function ShowDisplay() {
  const [selectedShow, setSelectedShow] = useState();
  const router = useRouter();

  useEffect(() => {
    const getShow = async () => {
      const { showID } = router.query;
      const response = await fetch(`/api/shows/${showID}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const show = await response.json();
      setSelectedShow(show);
    }
    if (router.isReady === true) {
      getShow();
    }
  }, [router.isReady]);

  return (
    <Layout title={selectedShow ? `${selectedShow.title} | WRMC 91.1 FM` : "WRMC 91.1 FM"}>
      <main>{selectedShow && <ShowDetails show={selectedShow}/>}</main>
    </Layout>
  );
}