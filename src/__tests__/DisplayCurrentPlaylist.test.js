/*

Tests for DisplayCurrentPlaylist.js

*/
import { render, screen } from "@testing-library/react";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import { samplePlaylist } from "../lib/test-utils.js";

describe("DisplayCurrentPlaylist tests", () => {

  test("current playlist is displayed", () => {
    render(<DisplayCurrentPlaylist playlist={samplePlaylist, songs}/>);

    expect(screen.queryByText("sample title")).toBeInTheDocument();
  });

});