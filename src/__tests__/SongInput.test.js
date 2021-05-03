/*

Tests for SongInput.js

*/
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SongInput from "../components/SongInput";

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

describe("SongInput tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    const sampleSong = {title: "", artist: "", album: "", albumArt:"https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png", id: 0, playlistID: 0};
    render(<SongInput complete={handler} song={sampleSong}/>);

  });

  test("Enter button is disabled without title", () => {

    populateTextInputs();

    const titleInput = screen.getByRole("textbox", {name: "Title"});
    fireEvent.change(titleInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test("Enter button is disabled without artist", () => {

    populateTextInputs();

    const artistInput = screen.getByRole("textbox", {name: "Artist"});
    fireEvent.change(artistInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test("Enter button is disabled without album", () => {

    populateTextInputs();

    const albumInput = screen.getByRole("textbox", {name: "Album"});
    fireEvent.change(albumInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test("Enter button is enabled when all inputs have contents", () => {
    
    const titleInput = screen.getByRole("textbox", {name: "Title"});
    expect(titleInput).toHaveValue("");
    
    const artistInput = screen.getByRole("textbox", {name: "Artist"});
    expect(artistInput).toHaveValue("");

    const albumInput = screen.getByRole("textbox", {name: "Album"});
    expect(albumInput).toHaveValue("");

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: sampleTitle } });
    fireEvent.change(artistInput, { target: { value: sampleArtist } });
    fireEvent.change(albumInput, { target: { value: sampleAlbum } });

    expect(titleInput).toHaveValue(sampleTitle);
    expect(artistInput).toHaveValue(sampleArtist);
    expect(albumInput).toHaveValue(sampleAlbum);
    
    expect(enterButton).toBeEnabled();

  });

  test("When a song is entered, the text on the enter button changes to update", () => {
    
    populateTextInputs();

    let enterButton = screen.getByRole("button", { name: "Enter" });
    fireEvent.click(enterButton);

    const updateButton = screen.getByRole("button", { name: "Update" });
    expect(updateButton).toBeInTheDocument();

    enterButton = screen.queryByRole("button", { name: "Enter" });
    expect(enterButton).not.toBeInTheDocument();

  });

  test("Image appears when component is first rendered", () => {
    let image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  test("Correct image appears when a valid album is entered", async () => {
    const titleInput = screen.getByRole("textbox", {name: "Title"});
    const artistInput = screen.getByRole("textbox", {name: "Artist"});
    const albumInput = screen.getByRole("textbox", {name: "Album"});

    fireEvent.change(titleInput, { target: { value: "Strong Enough" } });
    fireEvent.change(artistInput, { target: { value: "Cher" } });
    fireEvent.change(albumInput, { target: { value: "Believe" } });

    let enterButton = screen.getByRole("button", { name: "Enter" });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(screen.getByRole("img").src).toEqual("https://lastfm.freetls.fastly.net/i/u/34s/3b54885952161aaea4ce2965b2db1638.png");
    });
    
  });

  test("Placeholder image appears when an invalid album is entered", async () => {
    const titleInput = screen.getByRole("textbox", {name: "Title"});
    const artistInput = screen.getByRole("textbox", {name: "Artist"});
    const albumInput = screen.getByRole("textbox", {name: "Album"});

    fireEvent.change(titleInput, { target: { value: "Strong Enough" } });
    fireEvent.change(artistInput, { target: { value: "Cher" } });
    fireEvent.change(albumInput, { target: { value: "Believe" } });

    let enterButton = screen.getByRole("button", { name: "Enter" });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(screen.getByRole("img").src).toEqual("https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png");
    });
  });

});