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
  if (dayToInt[a.time.day] > dayToInt[b.time.day]){
    return a
  } else if (dayToInt[a.time.day] < dayToInt[b.time.day]){
    return b
  } else {
    if (a.time.hour >= b.time.hour){
      return a
    } else {
      return b
    }
  }
}