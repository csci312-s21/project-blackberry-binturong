/*
  StartShowButton.js

  Allows DJ to start their show so they can log a new playlist.

*/
import { useState } from "react";
import { getRandomIntID } from "../lib/component-utils.js";
import shows from "../../data/shows.json";

export default function StartShowButton() {
  const [selectedShowID, setSelectedShowID] = useState();
  const [allShows] = useState(shows);

  const startShow = async (showId) => {
    const newPlaylist = { date: moment().format("M-DD-YYYY"), showID: showId, id: getRandomIntID(), current: true };
    
    const response = await fetch("/api/playlists", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: new Headers({ "Content-type": "application/json" }),
    });
      
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  const options = allShows.map(
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
