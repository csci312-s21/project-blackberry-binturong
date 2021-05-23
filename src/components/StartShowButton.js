/*
  StartShowButton.js

  Allows DJ to start their show so they can log a new playlist.

*/
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import moment from "moment";
import Link from "next/link";
import shows from "../../data/shows.json";

export default function StartShowButton() {
  const [session] = useSession();
  const [userShows, setUserShows] = useState([]);
  const [selectedShowID, setSelectedShowID] = useState();
  const [newPlaylist, setNewPlaylist] = useState()

  useEffect(() => {
    const getUserShows = async () => {
      const djResponse = await fetch("/api/djs");

      if (!djResponse.ok) {
        throw new Error(djResponse.statusText);
      }

      const allDJs = await djResponse.json();

      const [loggedInDJ] = allDJs.filter((dj) => dj.email === session.user.email);

      const showResponse = await fetch("/api/shows");

      if (!showResponse.ok) {
        throw new Error(showResponse.statusText);
      }

      const allShows = await showResponse.json();

      const djShows = allShows.filter((show) => show.DJs.includes(loggedInDJ.name));
    
      setUserShows(djShows);
    }

    if (session) {
      getUserShows();
    }
  }, []);

  useEffect(() => {
    const addPlaylist = async () => {
    
      const response = await fetch("/api/playlists", {
        method: "POST",
        body: JSON.stringify(newPlaylist),
        headers: new Headers({ "Content-type": "application/json" })
      });
        
      if (!response.ok) {
        console.log(response)
        throw new Error(response.statusText);
      }
    }

    if (newPlaylist) {
      addPlaylist();
    }
  }, [newPlaylist]);

  const startShow = (showId) => {
    setNewPlaylist({ date: moment().format("M-DD-YYYY"), showID: showId, current: true });
  }

  const options = shows.map(
    (show) => <option data-testid="show-option" value={show.id} key={show.id}>{show.title}</option>);

  return (
    <div>
      <select defaultValue="Select a show:" onChange={() => setSelectedShowID(event.target.value)}>
        <option disabled>Select a show:</option>
        {options}
      </select>
      <Link href="/log-playlist">
        <input
          type="button"
          value="Start Show!"
          disabled={!selectedShowID}
          onClick={() => startShow(+selectedShowID)}/>
      </Link>
    </div>
  );
}
