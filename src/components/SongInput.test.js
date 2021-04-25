/*

Tests for SongInput.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import SongInput from "./SongInput";

const populateTextInputs = (container) => {
  const titleInput = container.querySelector("input[type=text]", {name: "Title"});
  const artistInput = container.querySelector("input[type=text]", {name: "Artist"});
  const albumInput = container.querySelector("input[type=text]", {name: "Album"});

  fireEvent.change(titleInput, { target: { value: sampleTitle } });
  fireEvent.change(artistInput, { target: { value: sampleArtist } });
  fireEvent.change(albumInput, { target: { value: sampleAlbum } });
}

describe("SongInput tests", () => {

  const sampleTitle = "Sample Title";
  const sampleArtist = "Sample Artist";
  const sampleAlbum = "Sample Album";

  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test.skip("Entering a new song will render all of that text on the page", () => {
    const { container } = render(<SongInput complete={handler}/>);

    const titleInput = container.querySelector("input[type=text]", {name: "Title"});
    const artistInput = container.querySelector("input[type=text]", {name: "Artist"});
    const albumInput = container.querySelector("input[type=text]", {name: "Album"});
    
    fireEvent.change(titleInput, { target: { value: sampleTitle } });
    fireEvent.change(artistInput, { target: { value: sampleArtist } });
    fireEvent.change(albumInput, { target: { value: sampleAlbum } });

    fireEvent.click(screen.queryByRole("button", {name: "Enter"}));

    expect(handler).toHaveBeenCalled();
    // not complete
  });

  test("Enter button is disabled without title", () => {
    const { container } = render(<SongInput complete={handler}/>);

    let titleInput = container.querySelector("input[type=text]", {name: "Title"});
    const artistInput = container.querySelector("input[type=text]", {name: "Artist"});
    const albumInput = container.querySelector("input[type=text]", {name: "Album"});

    populateTextInputs(container);

    titleInput = container.querySelector("input[type=text]", {name: "Title"});
    fireEvent.change(titleInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test("Enter button is disabled without artist", () => {
    const { container } = render(<SongInput complete={handler}/>);

    populateTextInputs(container);

    const artistInput = container.querySelector("input[type=text]", {name: "Artist"});
    fireEvent.change(artistInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test("Enter button is disabled without album", () => {
    const { container } = render(<SongInput complete={handler}/>);
    populateTextInputs(container);

    const albumInput = container.querySelector("input[type=text]", {name: "Album"});
    fireEvent.change(albumInput, { target: { value: "" } });

    const enterButton = screen.getByRole("button", { name: "Enter" });
    expect(enterButton).toBeDisabled();
  });

  test.only("Enter button is enabled when all inputs have contents", () => {
    const { container } = render(<SongInput complete={handler}/>);
    
    const titleInput = container.querySelector("input[type=text]", {name: "Title"});
    expect(titleInput).toHaveValue("");
    
    const artistInput = container.querySelector("input[type=text]", {name: "Artist"});
    expect(artistInput).toHaveValue("");

    const albumInput = container.querySelector("input[type=text]", {name: "Album"});
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

});