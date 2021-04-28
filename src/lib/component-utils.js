/*

This file is for various functions or constants that might be useful in multiple components

*/


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
  if (dayToInt[a.time.day] < dayToInt[b.time.day]){
    return -1
  } else if (dayToInt[a.time.day] > dayToInt[b.time.day]){
    return 1
  } else {
    if (a.time.hour <= b.time.hour){
      return -1
    } else {
      return 1
    }
  }
}

// this function takes a show and return a string of the time in a pretty format, e.g. "9:00 - 10:00 am"
export const getTimeString = (start, duration) => {
  const splitTime = (time) => {
    return {
      hour: time.toString().substring(0, time.toString().length - 2),
      minute: time.toString().substring(time.toString().length - 2),
    }
  }

  const startTime = splitTime(start);
  const end = start + (duration * 100);
  const endTime = splitTime(end);
  const period = ((endTime.hour >= 12) && (endTime.hour < 24)) ? "pm" : "am";

  const twelveHourTime = (time) => {
    const converted = time % 12;
    return (converted === 0) ? 12 : converted;
  }

  return `${twelveHourTime(startTime.hour)}:${startTime.minute} - ${twelveHourTime(endTime.hour)}:${endTime.minute} ${period}`
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