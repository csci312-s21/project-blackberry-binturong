import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import Layout from "../components/Layout.js";
import moment from "moment-timezone";
import { showIsCurrent, upcomingShowsArray } from "../lib/component-utils.js";
import { useState, useEffect } from "react";

import styles from "../styles/Main.module.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

moment.tz.setDefault("America/New_York");

export default function WRMCWebsite() {
  const [shows, setAllShows] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const responseShow = await fetch("/api/shows");
      if (!responseShow.ok) {
        throw new Error(responseShow.statusText);
      }
      const showData = await responseShow.json();
      setAllShows(showData);

      const responseSong = await fetch("/api/songs");
      if (!responseSong.ok) {
        throw new Error(responseSong.statusText);
      }
      const songData = await responseSong.json();
      setAllSongs(songData);

      const responseP = await fetch("/api/playlists");
      if (!responseP.ok) {
        throw new Error(responseP.statusText);
      }
      const playlistsData = await responseP.json();
      setAllPlaylists(playlistsData);
    };
    getData();
  }, []);

  let mainContents;
  if (shows.length !== 0 && allPlaylists.length !== 0) {
    const upcomingShows = upcomingShowsArray(shows, moment());
    const isOnAir =
      upcomingShows.length >= 1 && showIsCurrent(upcomingShows[0]);
    const currentPlaylist = allPlaylists.filter((p) => p.current);

    mainContents = (
      <Layout title="WRMC 91.1 FM Middlebury College">
        <Row>
          <Col xs={12} md={4} className={styles.index_column}>
            <DisplayCurrentShow show={isOnAir ? upcomingShows[0] : undefined} />
          </Col>

          <Col xs={12} md={4} className={styles.index_column}>
            <DisplayCurrentPlaylist
              playlist={currentPlaylist[0]}
              allSongs={allSongs}
            />
          </Col>

          <Col xs={12} md={4} className={styles.index_column}>
            <ShowOTW
              show={shows.find(
                (show) => show.title === "CS 312 Presentation Show"
              )}
            />
          </Col>
        </Row>

        <Row className={styles.index_row_center}>
          <Col xs={12} md={8} className={styles.index_column}>
            <NextThreeShows
              shows={
                isOnAir ? upcomingShows.slice(1, 4) : upcomingShows.slice(0, 3)
              }
            />
          </Col>
        </Row>
      </Layout>
    );
  }

  return <div>{mainContents}</div>;
}
