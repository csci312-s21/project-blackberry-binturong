/*

This file is for helper functions/constants for our tests

*/

export const sampleShows = [
  {
    "title": "Sample Show 1",
    "DJs": ["Kyle Hooker"],
    "description": "sample description 1",
    "time": {
      "day": "F",
      "hour": 800,
      "duration": 1
    },
    "genres": ["Rock"],
    "id": 55
  },
  {
    "title": "Sample Show 2",
    "DJs": ["Daniel Levesque","Lachlan Pinney"],
    "description": "sample description 2",
    "time": {
      "day": "F",
      "hour": 900,
      "duration": 1
    },
    "genres": ["News"],
    "id": 56
  },
  {
    "title": "Sample Show 3",
    "DJs": ["Emma Tzotschew","Andrew Grossman"],
    "description": "sample description 3",
    "time": {
      "day": "F",
      "hour": 1000,
      "duration": 1
    },
    "genres": ["Folk","Indie","Talk"],
    "id": 57
  },
  {
    "title": "Sample Show 4",
    "DJs": ["Emma Tzotschew","Andrew Grossman"],
    "description": "sample description 4",
    "time": {
      "day": "F",
      "hour": 700,
      "duration": 1
    },
    "genres": ["Folk","Indie","Talk"],
    "id": 58
  }
];


export const sampleShow = {
  "title": "Sample Show 1",
  "DJs": ["Kyle Hooker"],
  "description": "sample description 1",
  "time": {
    "day": "F",
    "hour": 800,
    "duration": 1
  },
  "genres": ["Rock"],
  "id": 55
};


export const samplePlaylist = {
  "date": "05-02-2021",
  "id": 12,
  "showID": 55
}

export const samplePlaylists = [
  {
    "date": "05-02-2021",
    "id": 12,
    "showID": 55
  },
  {
    "date": "05-01-2021",
    "id": 13,
    "showID": 55
  },
  {
    "date": "04-30-2021",
    "id": 14,
    "showID": 55
  },
  {
    "date": "04-29-2021",
    "id": 15,
    "showID": 56
  }
]

export const sampleSong = {
  "title": "sample title",
  "artist": "sample artist",
  "album": "sample album",
  "playlistID": 55,
  "id": 42
}
