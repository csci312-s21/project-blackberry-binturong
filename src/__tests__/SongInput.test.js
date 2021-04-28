/*

Tests for SongInput.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
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
    render(<SongInput complete={handler}/>);
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

});