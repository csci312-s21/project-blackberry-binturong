/*
  StartShowButton.js

  Allows DJ to start their show so they can log a new playlist.

*/
import PropTypes from "prop-types";
import { showType } from "../lib/types.js";
import { useState } from "react";

export default function StartShowButton({ userShows, startShow }) {
  const [selectedShowID, setSelectedShowID] = useState();

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

StartShowButton.propTypes = {
  userShows: PropTypes.arrayOf(showType).isRequired,
  startShow: PropTypes.func.isRequired
}