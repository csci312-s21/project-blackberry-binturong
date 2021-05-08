/*

Top-level integration Tests

Any tests that require mocking the next-auth module should be put into auth.test.js

*/
import fetchMock from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import WRMCWebsite from "../pages/index";

describe("Top level integration tests", () => {

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