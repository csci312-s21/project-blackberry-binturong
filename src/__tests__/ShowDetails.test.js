import { render, screen } from "@testing-library/react";
import ShowDetails from "../components/ShowDetails.js";
import { sampleShow, samplePlaylists } from "../lib/test-utils.js";

describe("ShowDetails tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
    render(<ShowDetails show={sampleShow} playlists={samplePlaylists} clickPlaylist={handler}/>);
  });

  test("ShowDetails displays title", () => {
    expect(screen.getByText("Sample Show 1")).toBeInTheDocument();
  });

  test("ShowDetails displays DJs", () => {
    expect(screen.getByText("Kyle Hooker")).toBeInTheDocument();
  });

  test("ShowDetails displays description", () => {
    expect(screen.getByText("sample description 1")).toBeInTheDocument();
  });

  test("ShowDetails displays time", () => {
    expect(screen.getByText("Friday, 8:00 - 9:00 am")).toBeInTheDocument();
  });

  test("ShowDetails displays genres", () => {
    expect(screen.getByText("Rock")).toBeInTheDocument();
  });

  test("ShowDetails displays playlists", () => {
    samplePlaylists.forEach((playlist) => {
      if (playlist.showID === sampleShow.id) {
        expect(screen.getByText(playlist.date)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(playlist.date)).not.toBeInTheDocument();
      }
    });
  });

});