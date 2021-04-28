/*

Tests for PlaylistLogger.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistLogger from "../components/PlaylistLogger.js";

const sampleShow = {
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

const samplePlaylists = [
  {
    "songs": [
      {
      "title": "title",
      "artist": "artist",
      "album": "album"
      }
    ],
    "time": "",
    "id": 0,
    "showID": 55,
    "isCurrent": true
  }
];

describe("PlaylistLogger tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<PlaylistLogger complete={handler} showID={sampleShow.id} playlists={samplePlaylists}/>);
  });

  test.only("Add button adds new row", () => {
    const songInputs = screen.queryAllByRole("listitem");
    const addButton = screen.getByRole("button", { name: "Add Row" });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length + 1);
  });

  test("Delete button deletes current row", () => {
    const addButton = screen.getByRole("button", { name: "Add Row" });
    fireEvent.click(addButton);

    const songInputs = screen.queryAllByRole("listitem");
    
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length - 1);
  });
});