import { render, screen } from "@testing-library/react";
import ShowDetails from "../components/ShowDetails.js";
import { sampleShow } from "../lib/test-utils.js";

describe("ShowDetails tests", () => {

  beforeEach(() => {
    render(<ShowDetails show={sampleShow} />);
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

  test.skip("ShowDetails displays playlists", () => {
    // TODO: update this test when we have playlist data
  });

});