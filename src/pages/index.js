import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import Schedule from "../components/Schedule.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import PlaylistLogger from "../components/PlaylistLogger.js";
import StartShowButton from "../components/StartShowButton.js";
import ShowDetails from "../components/ShowDetails.js";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import PlaylistDetails from "../components/PlaylistDetails.js";
import Head from "next/head";

import moment from "moment-timezone";
import shows from "../../data/shows.json";
import { sampleSongs } from "../lib/test-utils.js";
import playlists from "../../data/playlists.json";
import styles from "../styles/Main.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { upcomingShowsArray, getRandomIntID } from "../lib/component-utils.js";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

moment.tz.setDefault("America/New_York");

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [allPlaylists, setAllPlaylists] = useState(playlists);
  const [allSongs, setAllSongs] = useState(sampleSongs);
  const [sotw] = useState(allShows[6]); //placeholder, eventually we will want a callback: "setSotw"
  const [page, setCurrentPage] = useState("Home");
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [selectedShow, setSelectedShow] = useState(); // state for displaying ShowDetails
  const [selectedPlaylist, setSelectedPlaylist] = useState(); // state for displaying PlaylistDetails
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];
  const [session] = useSession();

  const endShow = () => {
    setCurrentPage("Home");
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

  const startShow = (showId) => {
    setCurrentPage("Log Playlist");
    const newPlaylist = {
      date: moment().format("M-DD-YYYY"),
      showID: showId,
      id: getRandomIntID(),
    };
    setCurrentPlaylist(newPlaylist);
    setAllPlaylists([...allPlaylists, newPlaylist]);
  };

  // callback function to select page in NavBar
  const selectPage = (newPage) => {
    setCurrentPage(newPage);
    setSelectedShow();
  };

  // callback function to display ShowDetails page
  const clickShow = (show) => {
    setSelectedShow(show);
    setCurrentPage("Show Details");
  };

  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;
  if (upcomingShows.length >= 1) {
    isOnAir = upcomingShows[0].time.hour === now.hour() * 100;
  }
  // callback function to display PlaylistDetails page
  const clickPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentPage("Playlist Details");
  };

  const placeholderPages = {
    // TODO: we should create a container component for the Home page
    // (and any other pages that end up having multiple components)
    Home: (
      <Container>
        <Row className={styles.index_row_center}>
          <Col xs={8} md={6} className={styles.index_column}>
            <PlayButton />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4} className={styles.index_column}>
            <DisplayCurrentShow
              show={
                isOnAir
                  ? upcomingShows[0]
                  : shows.find((show) => show.id === 12345)
              }
              handleClick={clickShow}
            />
          </Col>

          <Col xs={12} md={4} className={styles.index_column}>
            <DisplayCurrentPlaylist
              playlist={currentPlaylist}
              allSongs={allSongs}
            />
          </Col>

          <Col xs={12} md={4} className={styles.index_column}>
            {<ShowOTW show={sotw} handleClick={clickShow} />}
          </Col>
        </Row>

        <Row className={styles.index_row_center}>
          <Col xs={12} md={8} className={styles.index_column}>
            <NextThreeShows
              shows={
                isOnAir ? upcomingShows.slice(1, 4) : upcomingShows.slice(0, 3)
              }
              handleClick={clickShow}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </Container>
    ),

    Blog: <h2>This is the blog</h2>,
    Schedule: <Schedule shows={allShows} />,
    Community: <h2>This is the community page</h2>,
    About: <h2>This is the about page</h2>,
  };

  // this if statement determines which page to display - add more else ifs as we add more specialized pages.
  let displayPage;
  if (page === "Log Playlist" && session) {
    displayPage = (
      <PlaylistLogger
        complete={updateSongCollection}
        currentPlaylist={currentPlaylist}
        endShow={endShow}
        shows={allShows}
        songs={allSongs}
      />
    );
  } else if (page === "Show Details") {
    displayPage = (
      <ShowDetails
        show={selectedShow}
        playlists={allPlaylists}
        clickPlaylist={clickPlaylist}
      />
    );
  } else if (page === "Playlist Details") {
    displayPage = (
      <PlaylistDetails
        playlist={selectedPlaylist}
        songs={allSongs}
        shows={allShows}
        backToShow={clickShow}
      />
    );
  } else {
    displayPage = placeholderPages[page];
  }

  return (
    <div className={styles.main_page}>
      <Head>
        <title>WRMC 91.1 FM Middlebury College Radio</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.icon_div}>
          <img
            src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
            className={styles.wrmc_icon}
          />
        </div>
        <LoginButton />
        {session &&
          (currentPlaylist ? (
            <input
              type="button"
              value="Go to Current Playlist"
              onClick={() => setCurrentPage("Log Playlist")}
            />
          ) : (
            <StartShowButton
              userShows={allShows.slice(0, 4)}
              startShow={startShow}
            />
          ))}
        <h1>WRMC 91.1 FM</h1>
        <NavBar
          pageList={pageList}
          currentPage={page}
          setCurrentPage={selectPage}
        />
        {displayPage}
      </main>

      <footer>
        <p className={styles.footer_style}>A CS312 Project</p>
      </footer>
    </div>
  );
}
