/*

This file is for various functions or constants that might be useful in multiple components

*/
import { customAlphabet } from "nanoid";
import moment from "moment";

// the day of week for out show data is represented as a string, so this object 
// could be used to convert to an integer for comparison purposes
export const dayToInt = {
  "Su": 0,
  "M": 1,
  "T": 2,
  "W": 3,
  "Th": 4,
  "F": 5,
  "S": 6
}

// this function returns the earlier of two shows, useful for sorting an array of shows
export const compareTwoShows = (a, b) => {
  const aTime = moment(`${dayToInt[a.day]} ${a.hour}`, "d Hmm");
  const bTime = moment(`${dayToInt[b.day]} ${b.hour}`, "d Hmm");

  return moment(aTime).isBefore(bTime) ? -1 : 1;
}

// this function takes a show and return a string of the time in a pretty format, e.g. "9:00 - 10:00 am"
export const getTimeString = (hour, duration) => {
  const start = (hour === 0) ? moment(hour, "H") : moment(hour, "Hmm");
  return `${start.format("h:mm")} - ${start.add(duration, "hour").format("h:mm a")}`;
}

//Takes the char from show.time.day and returns string of the day (e.g. "M" ==> "Monday"). Right now, I'm only using it for showOTW, but I'd imagine it might come in handy later. 
export const getDayString = (d) => {
  if (d==="M"){return "Monday"}
  else if (d==="T"){return "Tuesday"}
  else if (d==="W"){return "Wednesday"}
  else if (d==="Th"){return "Thursday"}
  else if (d==="F"){return "Friday"}
  else if (d==="S"){return "Saturday"}
  else if (d==="Su"){return "Sunday"}
}

// this function will generate a random 17-digit integer
// according to the nano id collision calculator, "~256 years needed, in order to have a 1% probability of at least one collision."
export const getRandomIntID = () => {
  const nanoid = customAlphabet("1234567890", 17);
  return +nanoid();
}


//This function returns the array of upcomingShows
//This array should start at the current show and include all of the remaining shows for the day. In Index it is used to pass the current show to DisplayCurrentShow and the next three shows to NextThreeShows
export const upcomingShowsArray = (shows, now) => {
  const upcomingShows = shows.filter((show) => (dayToInt[show.day] === now.day()) && (show.hour >= (now.hour() * 100)));

  upcomingShows.sort((a, b) => compareTwoShows(a, b));
  return upcomingShows;
}

// this function returns the earlier of two playlists based on playlist.date
export const compareTwoPlaylists = (a, b) => {
  const aDate = moment(a.date, "M-DD-YYYY");
  const bDate = moment(b.date, "M-DD-YYYY");
  return aDate.isBefore(bDate) ? -1 : 1;
}

// this function returns the earlier of two playlists based on playlist.date
export const compareTwoSongs = (a, b) => {
  return moment(a.timeAdded, "h:mm a").isBefore(moment(b.timeAdded, "h:mm a")) ? -1 : 1;
}


//Takes the char form show.day and returns a number M-Su ===1-7
export const getDayInt = (d) => {
  if (d==="M"){return 0}
  else if (d==="T"){return 1}
  else if (d==="W"){return 2}
  else if (d==="Th"){return 3}
  else if (d==="F"){return 4}
  else if (d==="S"){return 5}
  else if (d==="Su"){return 6}
}

//Colors for displaying genres in the schedule.
export const colors = {
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