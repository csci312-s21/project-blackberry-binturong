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


export const playlistType = PropTypes.shape({}); // fill this out as needed!

export const songType = PropTypes.shape({}); // fill this out as needed!