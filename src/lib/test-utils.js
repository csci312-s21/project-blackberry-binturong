/*

This file is for helper functions/constants for our tests

*/

export const sampleShows = [
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
  },
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
  "date": "5-02-2021",
  "id": 12,
  "showID": 55
}

export const samplePlaylists = [
  {
    "date": "5-02-2021",
    "id": 12,
    "showID": 55
  },
  {
    "date": "5-01-2021",
    "id": 13,
    "showID": 55
  },
  {
    "date": "4-30-2021",
    "id": 14,
    "showID": 55
  },
  {
    "date": "4-29-2021",
    "id": 15,
    "showID": 56
  }
]

export const sampleSong = {
  "title": "sample title",
  "artist": "sample artist",
  "album": "sample album",
  "playlistID": 12,
  "id": 42
}

export const sampleSongs = [
  {
    "title": "sample title 1",
    "artist": "sample artist 1",
    "album": "sample album 1",
    "playlistID": 12,
    "id": 1,
    "timeAdded": "2021-05-02T20:00:24-04:00"
  },
  {
    "title": "sample title 2",
    "artist": "sample artist 2",
    "album": "sample album 2",
    "playlistID": 12,
    "id": 2,
    "timeAdded": "2021-05-02T20:03:24-04:00"
  },
  {
    "title": "sample title 3",
    "artist": "sample artist 3",
    "album": "sample album 3",
    "playlistID": 12,
    "id": 3,
    "timeAdded": "2021-05-02T20:22:24-04:00"
  },
  {
    "title": "sample title 4",
    "artist": "sample artist 4",
    "album": "sample album 4",
    "playlistID": 12,
    "id": 42,
    "timeAdded": "2021-05-02T20:10:24-04:00"
  },
]
