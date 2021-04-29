/*
  StartShowButton.js

  Allows DJ to start their show so they can log a new playlist.

*/
import PropTypes from "prop-types";
import { showType } from "../lib/types.js";
import { useState } from "react";

export default function StartShowButton({ userShows, startShow }) {
  const [selectedShow, setSelectedShow] = useState();

  const options = userShows.map((show) => <option value={show.id}>{show.title}</option>);
  console.log("options", options);

  return (
    <div>
      <select onChange={() => setSelectedShow(event.target.value)}>
        <option disabled>Select show below:</option>
        {options}
      </select>
      <input
        type="button"
        value="Start Show!"
        onClick={() => startShow(selectedShow)}/>
    </div>
  );
};

StartShowButton.propTypes = {
  userShows: PropTypes.arrayOf(showType).isRequired,
  startShow: PropTypes.func.isRequired
}