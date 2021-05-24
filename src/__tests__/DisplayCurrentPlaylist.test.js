/*

Tests for DisplayCurrentPlaylist.js

*/
import { render, screen } from "@testing-library/react";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import { sampleSongs } from "../lib/test-utils.js";

describe("DisplayCurrentPlaylist tests", () => {

  // test("current playlist is displayed", () => {
  //   render(<DisplayCurrentPlaylist playlist ={samplePlaylist} allSongs = {sampleSongs} />);

  //   expect(screen.getByText("sample title 1")).toBeInTheDocument();
  //   expect(screen.queryByText("sample title 2")).toBeInTheDocument();
  //   expect(screen.queryByText("sample title 3")).toBeInTheDocument();
  //   expect(screen.queryByText("sample title 4")).toBeInTheDocument();
  // });

  test("no songs when no playlist input, but shows component", () =>{
    render(<DisplayCurrentPlaylist playlist={undefined} allSongs = {sampleSongs}/>);

    expect(screen.queryByText("Current Playlist")).toBeInTheDocument();
    expect(screen.queryByText("sample title 1")).not.toBeInTheDocument();
    expect(screen.queryByText("sample title 2")).not.toBeInTheDocument();
    expect(screen.queryByText("sample title 3")).not.toBeInTheDocument();
    expect(screen.queryByText("sample title 4")).not.toBeInTheDocument();
  });

});