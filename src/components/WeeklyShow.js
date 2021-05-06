import PropTypes from "prop-types";
import styles from "../styles/WeeklyShow.module.css";

export default function WeeklyShow({ show }){


  if (Object.keys(show).length === 0){
    return <div className={styles.WeeklyShow} style={{"backgroundColor": "#DDDDDD"}} />
  }

  const colors = {
    "blues": "#2994A3",
    "eclectic": "#00B1DA",
    "folk": "#14CD96",
    "indie": "#0033CC",
    "metal": "#D3D3D3",
    "punk": "#190707",
    "rock": "#F50046",
    "classical": "#FF918B",
    "electronic": "#00FF43",
    "fruit": "#005DD0",
    "jazz": "#6C29A3",
    "news": "#9B9B9B",
    "r&b / soul": "#D0A9F5",
    "sports": "#2E3B0B",
    "comedy": "#FFD700",
    "exec": "#228B22",
    "funk": "#FF9840",
    "kpop": "#89CFF0",
    "pop": "#FF00FF",
    "radio theatre": "#00FFFF",
    "talk": "#FA3F74",
    "dream pop": "#E987F2",
    "experimental": "#EB42F4",
    "hip hop": "#FA7198",
    "latin": "#2A52BE",
    "pop punk": "#190707",
    "reggae": "#0AC02B",
    "world": "#FFB700"
  }

  const djs = show.DJs.join(", ")
  const genrecolor = colors[show.genres[0].toLowerCase()]
  
  return (
    <div className={styles.WeeklyShow} style={{"backgroundColor": genrecolor}}>
      <p className={styles.ShowTitle}>{show.title}</p>
      <p>{djs}</p>
    </div>
  )
}

WeeklyShow.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string,
    DJs: PropTypes.arrayOf(PropTypes.string.isRequired),
    description: PropTypes.string,
    time: PropTypes.shape({
      day: PropTypes.string,
      hour: PropTypes.number,
      duration: PropTypes.number,
    }),
    genres: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
  }).isRequired
};