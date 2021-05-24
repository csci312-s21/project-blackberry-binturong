import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import PlaylistLogger from "../components/PlaylistLogger.js";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import Layout from "../components/Layout.js";

import moment from "moment-timezone";
import shows from "../../data/shows.json";
import { sampleSongs } from "../lib/test-utils.js";
import styles from "../styles/Main.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { upcomingShowsArray } from "../lib/component-utils.js";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

moment.tz.setDefault("America/New_York");

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [allSongs, setAllSongs] = useState(sampleSongs);
  const [sotw] = useState(allShows[6]); //placeholder, eventually we will want a callback: "setSotw"
  const [loggingPlaylist, setLoggingPlaylist] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [session] = useSession();

  const endShow = () => {
    setLoggingPlaylist(false);
    setCurrentPlaylist();
  };

  useEffect(() => {
    if (!session) {
      endShow();
    }
  }, [session]);

  const updateSongCollection = (action, newSong) => {
    if (action === "enter") {
      setAllSongs([...allSongs, newSong]);
    } else if (action === "update") {
      const newSongs = allSongs.map((song) =>
        song.id === newSong.id ? newSong : song
      );
      setAllSongs(newSongs);
    } else if (action === "delete") {
      const newSongs = allSongs.filter((song) => song.id !== newSong.id);
      setAllSongs(newSongs);
    }
  };

  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;
  if (upcomingShows.length >= 1) {
    isOnAir = upcomingShows[0].time.hour === now.hour() * 100;
  }

  // this if statement determines whether we show the regular home or the playlist logger
  let displayPage;
  if (loggingPlaylist && session) {
    displayPage = (
      <PlaylistLogger
        complete={updateSongCollection}
        currentPlaylist={currentPlaylist}
        endShow={endShow}
        shows={allShows}
        songs={allSongs}
      />
    );
  } else {
    displayPage = (
      <div>
        <Container>
          <Row>
            <Col xs={12} md={4} className={styles.index_column}>
              <DisplayCurrentShow
                show={
                  isOnAir
                    ? upcomingShows[0]
                    : shows.find((show) => show.id === 12345)
                }
              />
            </Col>

            <Col xs={12} md={4} className={styles.index_column}>
              <DisplayCurrentPlaylist
                playlist={currentPlaylist}
                allSongs={allSongs}
              />
            </Col>

            <Col xs={12} md={4} className={styles.index_column}>
              <ShowOTW show={sotw} />
            </Col>
          </Row>

          <Row className={styles.index_row_center}>
            <Col xs={12} md={8} className={styles.index_column}>
              <NextThreeShows
                shows={
                  isOnAir
                    ? upcomingShows.slice(1, 4)
                    : upcomingShows.slice(0, 3)
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return <Layout title="WRMC 91.1 FM Middlebury College">{displayPage}</Layout>;
}
