import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import ShowDetails from "../components/ShowDetails.js";
import Head from "next/head";

import moment from "moment";
import shows from "../../data/shows.json";
import styles from "../styles/Home.module.css";

import { useState } from "react";
import { dayToInt, compareTwoShows } from "../lib/component-utils.js";

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sotw] = useState(allShows[6]); //placeholder, eventually we will want a callback: "setSotw"
  const [page, setCurrentPage] = useState("Home");
  const [selectedShow, setSelectedShow] = useState();  // state for displaying ShowDetails
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];

  // callback function to select page in NavBar
  const selectPage = (newPage) => {
    setCurrentPage(newPage);
    setSelectedShow();
  }

  // callback function to display ShowDetails page
  const clickShow = (show) => {
    setSelectedShow(show);
    setCurrentPage("Show Details");
  }

  // determines the current and next three shows
  const now = moment();

  const upcomingShows = shows.filter(
    (show) => (dayToInt[show.time.day] === now.day()) && (show.time.hour >= (now.hour() * 100)));

  upcomingShows.sort((a, b) => compareTwoShows(a, b));

  const isOnAir = upcomingShows[0].time.hour === now.hour() * 100;

  const placeholderPages = {
    // TODO: we should create a container component for the Home page
    // (and any other pages that end up having multiple components)
    "Home" : <div>
              <ShowOTW show={sotw} handleClick={clickShow}/> <p>{""}</p>
              {isOnAir ? <DisplayCurrentShow show = {upcomingShows[0]} handleClick={clickShow}/> : <DisplayCurrentShow show = {shows.find(show => show.id === 12345)} handleClick={clickShow}/>}
              <p>{""}</p>
              {isOnAir ? <NextThreeShows shows={upcomingShows.slice(1,4)} handleClick={clickShow}/> : <NextThreeShows shows={upcomingShows.slice(0,3)} handleClick={clickShow}/>} 
             </div>,
    "Blog" : <h2>This is the blog</h2>,
    "Schedule" : <h2>This is the schedule</h2>,
    "Community" : <h2>This is the community page</h2>,
    "About" : <h2>This is the about page</h2>,
    "Show Details" : <ShowDetails show={selectedShow}/>
  };

  const current = placeholderPages[page];

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC 91.1 FM Middlebury College Radio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
        <PlayButton/>
        <NavBar 
          pageList={pageList}
          currentPage={page}
          setCurrentPage={selectPage}
        />
        {current}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}