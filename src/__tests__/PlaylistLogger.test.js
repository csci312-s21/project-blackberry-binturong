/*

Tests for PlaylistLogger.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistLogger from "../components/PlaylistLogger.js";
import { sampleShow, samplePlaylist, sampleSong } from "../lib/test-utils.js";

const sampleTitle = "Sample Title";
const sampleArtist = "Sample Artist";
const sampleAlbum = "Sample Album";

const populateTextInputs = () => {
  const titleInput = screen.getByRole("textbox", {name: "Title"});
  const artistInput = screen.getByRole("textbox", {name: "Artist"});
  const albumInput = screen.getByRole("textbox", {name: "Album"});

  fireEvent.change(titleInput, { target: { value: sampleTitle } });
  fireEvent.change(artistInput, { target: { value: sampleArtist } });
  fireEvent.change(albumInput, { target: { value: sampleAlbum } });
}

describe("PlaylistLogger tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<PlaylistLogger complete={handler} showID={sampleShow.id} currentPlaylist={samplePlaylist} shows={[sampleShow]} songs={[sampleSong]}/>);
  });

  test("Add button adds new row", () => {
    const addButton = screen.getByRole("button", { name: "Add Song" });
    expect(addButton).toBeInTheDocument();

    const songInputs = screen.queryAllByRole("listitem");

    fireEvent.click(addButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length + 1);
  });

  test("Delete button on empty row deletes row", () => {
    const addButton = screen.getByRole("button", { name: "Add Song" });
    fireEvent.click(addButton);

    const songInputs = screen.queryAllByRole("listitem");
    
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length - 1);
  });
});