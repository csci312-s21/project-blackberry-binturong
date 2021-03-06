/*
  types.js

  holds PropTypes for common data structures (show, playlist, song)
*/
import PropTypes from "prop-types";

// PropTypes for show object
export const showType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  DJs: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.number.isRequired,
});

// PropTypes of song object
export const songType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  time: PropTypes.string,
  id: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
});

// PropTypes of playlist object
export const playlistType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showId: PropTypes.number.isRequired,
});
