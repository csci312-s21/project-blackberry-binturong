/*

Top-level integration Tests

Any tests that require mocking the next-auth module should be put into auth.test.js

*/

//const fetch = require("node-fetch");
import fetchMock from "fetch-mock-jest";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import WRMCWebsite from "../pages/index";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("Top level integration tests", () => {

  beforeEach(() => {
    useSession.mockReturnValue([undefined, false]);
  });

  test("Smoke test", async () => {
    await act(async () => {
      await fetchMock.flush(true);
    });
  });
});
  /*
  test("Tests that the see-full-schedule button correctly displays the schedule", () => {
    render(<WRMCWebsite />);
    const schedule = screen.getByRole("link", {name:"Schedule"});
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveAttribute("href", "/schedule");
  });
});



describe("Start show button integration tests", () => {

  beforeEach(() => {
    useSession.mockClear();
  });

  test("Start show button not visible when logged out", () => {
    useSession.mockReturnValue([undefined, false]);
    render(<WRMCWebsite />);
    expect(
      screen.queryByRole("button", { name: "Start Show!" })
    ).not.toBeInTheDocument();
  });

  test("Start show button visible when logged in", () => {
    useSession.mockReturnValue([{ user: { name: "username" } }, false]);
    render(<WRMCWebsite />);
    expect(
      screen.getByRole("button", { name: "Start Show!" })
    ).toBeInTheDocument();
  });

  test("Start show button takes user to playlist logger", () => {
    useSession.mockReturnValue([{ user: { name: "username" } }, false]);
    render(<WRMCWebsite />);
    expect(
      screen.getByRole("button", { name: "Start Show!" })
    ).toBeInTheDocument();
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value } });
    const startShowButton = screen.getByRole("button", { name: "Start Show!" });
    expect(startShowButton).toBeEnabled();
    fireEvent.click(startShowButton);
    expect(
      screen.getByRole("button", { name: "Add Song" })
    ).toBeInTheDocument();
  });
});
*/

describe("PlaylistLogger integration tests", () => {

  /* commenting out for linter -- used in test for saving changes
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
  }*/

  beforeEach(() => {
    useSession.mockClear();
  });

  test("PlaylistLogger not visible when logged out", () => {
    useSession.mockReturnValue([undefined, false]);
    render(<WRMCWebsite />);
    expect(
      screen.queryByRole("button", { name: "Add Song" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Go to Current Playlist" })
    ).not.toBeInTheDocument();
  });

  /*
  This functionality is tricky now that we've implemented routing. For the sake of getting the PR in, I'm commenting it out for now and we can discuss it when we meet later today!

  test("saved songs persist when navigating away from PlaylistLogger", () => {
    useSession.mockReturnValue([{user: {name: "username"}}, false]);
    render(<WRMCWebsite />);
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value }});

    fireEvent.click(screen.getByRole("button", { name: "Start Show!" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Song" }));

    populateTextInputs()
    fireEvent.click(screen.getByRole("button", { name: "Enter" }));
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("Home"));
    fireEvent.click(screen.getByRole("button", { name: "Go to Current Playlist" }));

    expect(screen.getByRole("textbox", {name: "Title"})).toHaveValue(sampleTitle);
    expect(screen.getByRole("textbox", {name: "Artist"})).toHaveValue(sampleArtist);
    expect(screen.getByRole("textbox", {name: "Album"})).toHaveValue(sampleAlbum);
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });
  */
});
