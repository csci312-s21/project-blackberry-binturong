/*
  StartShowButton.js

  Allows DJ to start their show so they can log a new playlist.

*/
import { useState, useEffect } from "react";
import moment from "moment";
import shows from "../../data/shows.json";
import { useSession } from "next-auth/client";

export default function StartShowButton() {
  const [session] = useSession();
  const [userShows, setUserShows] = useState([]);
  const [selectedShowID, setSelectedShowID] = useState();

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

  const startShow = async (showId) => {
    const newPlaylist = { date: moment().format("M-DD-YYYY"), showID: showId, current: true };
    
    const response = await fetch("/api/playlists", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: new Headers({ "Content-type": "application/json" })
    });
      
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  const options = userShows.map(
    (show) => <option data-testid="show-option" value={show.id} key={show.id}>{show.title}</option>);

  return (
    <div>
      <select defaultValue="Select a show:" onChange={() => setSelectedShowID(event.target.value)}>
        <option disabled>Select a show:</option>
        {options}
      </select>
      <input
        type="button"
        value="Start Show!"
        disabled={!selectedShowID}
        onClick={() => startShow(+selectedShowID)}/>
    </div>
  );
}
