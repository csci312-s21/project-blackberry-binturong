/*
  ShowPage.js

  This component displays a comprehensive overview of all relevant information about a show, 
  including the title, DJ(s), time, description, genres, and past playlists. This page is accessed whenever the user 
  clicks on a show anywhere on the website.

  props:
    show - a show object
*/
import PropTypes from "prop-types";
import { getTimeString, getDayString } from "../lib/globals.js";

export default function ShowPage({ show }) {
  const time = getTimeString(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);

  return (
    <div>
      <div>{show.title}</div>
      <div><span>Hosted By:</span> {show.DJs.join(" ")}</div>
      <div><span>Genre(s):</span> {show.genres.join(" ")}</div>
      <div><span>Time:</span> {day}, {time}</div>
      <div><span>Description:</span> {show.description}</div>
      <div><span>Playlists:</span> TODO</div>
    </div>
    );
}

ShowPage.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    DJs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.shape({
      day: PropTypes.string.isRequired,
      hour: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired
};
