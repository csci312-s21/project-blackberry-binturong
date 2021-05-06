/*
  types.js

  holds PropTypes for common data structures (show, playlist, song)
*/
import PropTypes from "prop-types";


// PropTypes for show object
export const showType = PropTypes.shape({
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
});

// PropTypes of song object
export const songType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  timeAdded: PropTypes.string,
  id: PropTypes.number.isRequired,
  playlistID: PropTypes.number.isRequired,
});

// PropTypes of playlist object
export const playlistType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showID: PropTypes.number.isRequired,
});
