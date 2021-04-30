/*

Tests for PlaylistLogger.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistLogger from "../components/PlaylistLogger.js";
import { sampleShow, samplePlaylist, sampleSong } from "../lib/test-utils.js";

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