import { render, screen } from "@testing-library/react";
import PlaylistDetails from "../components/PlaylistDetails.js";
import { samplePlaylist, sampleSongs, sampleShows } from "../lib/test-utils.js";
import moment from "moment";

describe("PlaylistDetails tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
    render(<PlaylistDetails playlist={samplePlaylist} songs={sampleSongs} currShow={sampleShows[1]} backToShow={handler}/>);
  });

  test("page displays show title and date", () => {
    const showTitle = sampleShows.find((show) => show.id === samplePlaylist.showId).title;
    const playlistDate = moment(samplePlaylist.date, "M-DD-YYYY").format("dddd MMMM Do YYYY");
    expect(screen.getByText(`Playlist for ${showTitle} ${playlistDate}`)).toBeInTheDocument();
  });

  test("songs are displayed", () => {
    const expectedSongs = sampleSongs.filter((song) => song.playlistId === samplePlaylist.id);
    const songDisplays = screen.getAllByRole("row");
    expect(songDisplays).toHaveLength(expectedSongs.length + 1);
    const songComponents = screen.getAllByRole("cell");
    expect(songComponents).toHaveLength(expectedSongs.length * 4);
  });

});