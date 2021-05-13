/*

Top-level integration Tests

Any tests that require mocking the next-auth module should be put into auth.test.js

*/
import fetchMock from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("Tests that the see-full-schedule button correctly displays the schedule", () => {
    render(<WRMCWebsite />);
    fireEvent.click(screen.queryByRole("button", { name: "See Full Schedule" }));
    expect(screen.queryByTestId("schedule")).toBeInTheDocument();
  });
});
  
describe("Show details integration tests", () => {
  let _Date;

  beforeAll(() => {
    useSession.mockReturnValue([undefined, false]);
    _Date = Date;
  });

  afterAll(() => {
    Date = _Date; // eslint-disable-line
  });

  test("clicking on SOTW title brings up details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking on show from NextThreeShows brings up details page", () => {
    // mock date.now function for deterministic testing of NextThreeShows
    Date.now = jest.fn(() => new Date(2021, 3, 27, 17));
    render(<WRMCWebsite />);
    const showSnippets = screen.getAllByTestId("show snippet");
    fireEvent.click(showSnippets[0]);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking a NavBar item removes show details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
    const homePage = screen.getByText("Home");
    fireEvent.click(homePage);
    expect(screen.queryByTestId("show details page")).not.toBeInTheDocument();
    expect(screen.getByTestId("SOTW title")).toBeInTheDocument();
  });
});

describe("PlaylistDetails integration tests", () => {
  beforeEach(() => {
    useSession.mockReturnValue([undefined, false]);
    render(<WRMCWebsite />);
  });

  test("clicking on a playlist in show details brings up playlist details", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    const playlists = screen.getAllByTestId("playlist-date");
    playlists.forEach((pl) => expect(pl).toBeInTheDocument());
    fireEvent.click(playlists[0]);
    expect(screen.getByRole("button", { name: "<< Back to show information" })).toBeInTheDocument();
  });

  test("clicking button in playlist details goes back to show details", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    const playlists = screen.getAllByTestId("playlist-date");
    playlists.forEach((pl) => expect(pl).toBeInTheDocument());
    fireEvent.click(playlists[0]);
    const backButton = screen.getByRole("button", { name: "<< Back to show information" });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    screen.getAllByTestId("playlist-date").forEach((pl) => expect(pl).toBeInTheDocument());
    expect(screen.queryByRole("button", { name: "<< Back to show information" })).not.toBeInTheDocument();
  });

});

describe("Start show button integration tests", () => {

  beforeEach(() => {
    useSession.mockClear();
  });

  test("Start show button not visible when logged out", () => {
    useSession.mockReturnValue([undefined, false]);
    render(<WRMCWebsite />);
    expect(screen.queryByRole("button", { name: "Start Show!" })).not.toBeInTheDocument();
  });

  test("Start show button visible when logged in", () => {
    useSession.mockReturnValue([{user: {name: "username"}}, false]);
    render(<WRMCWebsite />);
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
  });

  test("Start show button takes user to playlist logger", () => {
    useSession.mockReturnValue([{user: {name: "username"}}, false]);
    render(<WRMCWebsite />);
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value }});
    const startShowButton = screen.getByRole("button", { name: "Start Show!" });
    expect(startShowButton).toBeEnabled();
    fireEvent.click(startShowButton);
    expect(screen.getByRole("button", { name: "Add Song" })).toBeInTheDocument();
  });
});

describe("PlaylistLogger integration tests", () => {

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

  beforeEach(() => {
    useSession.mockClear();
  });
  
  test("PlaylistLogger not visible when logged out", () => {
    useSession.mockReturnValue([undefined, false]);
    render(<WRMCWebsite />);
    expect(screen.queryByRole("button", { name: "Add Song" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Go to Current Playlist" })).not.toBeInTheDocument();
  });

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
});