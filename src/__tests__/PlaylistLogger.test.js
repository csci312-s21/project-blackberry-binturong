/*

Tests for PlaylistLogger.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistLogger from "../components/PlaylistLogger.js";
import { sampleShow, samplePlaylist } from "../lib/test-utils.js";

describe("PlaylistLogger tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<PlaylistLogger complete={handler} showID={sampleShow.id} currentPlaylist={samplePlaylist}/>);
  });

  test("Add button adds new row", () => {
    const songInputs = screen.queryAllByRole("listitem");
    const addButton = screen.getByRole("button", { name: "Add Row" });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length + 1);
  });

  test("Delete button on empty row deletes row", () => {
    const addButton = screen.getByRole("button", { name: "Add Row" });
    fireEvent.click(addButton);

    const songInputs = screen.queryAllByRole("listitem");
    
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length - 1);
  });
});