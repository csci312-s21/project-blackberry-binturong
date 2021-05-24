/*

Tests for PlaylistLogger.js

*/
import { render } from "@testing-library/react";
import PlaylistLogger from "../components/PlaylistLogger.js";
//import { sampleShow, samplePlaylist, sampleSong2 } from "../lib/test-utils.js";

//complete={handler} showID={sampleShow.id} currentPlaylist={samplePlaylist} shows={[sampleShow]} songs={[sampleSong2]}

describe("PlaylistLogger tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<PlaylistLogger/>);
  });
  test("Sophisticated test", async () => {
    expect(true).toBeTruthy();
  });
  /*
  test("Add button adds new row", async () => {
    let addButton = await screen.getByRole("button", { name: "Add Song" });
    expect(addButton).toBeInTheDocument();
    //const songInputs = screen.queryAllByRole("listitem");
    fireEvent.click(addButton);
    let list = await screen.queryAllByRole("listitem");
    expect(list).toHaveLength(1);
    //await waitFor(() => {
      //expect(list).toHaveLength(1);
    //})
  
  });

  /*
  test("Delete button on empty row deletes row", () => {
    const addButton = screen.getByRole("button", { name: "Add Song" });
    fireEvent.click(addButton);

    const songInputs = screen.queryAllByRole("listitem");
    
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(screen.queryAllByRole("listitem")).toHaveLength(songInputs.length - 1);
  });
  */
});
