import { render, screen } from "@testing-library/react";
import ShowPage from "../components/ShowPage.js";

const sampleShow = {
  "title": "Sample Show 1",
  "DJs": ["Kyle Hooker"],
  "description": "sample description 1",
  "time": {
    "day": "F",
    "hour": 800,
    "duration": 1
  },
  "genres": ["Rock"],
  "id": 55
};

describe("ShowPage tests", () => {

  test("ShowPage displays title", () => {
    render(<ShowPage show={sampleShow} />);
    expect(screen.getByText("Sample Show 1")).toBeInTheDocument();
  });

  test("ShowPage displays DJs", () => {
    render(<ShowPage show={sampleShow} />);
    expect(screen.getByText("Kyle Hooker")).toBeInTheDocument();
  });

  test("ShowPage displays description", () => {
    render(<ShowPage show={sampleShow} />);
    expect(screen.getByText("sample description 1")).toBeInTheDocument();
  });

  test("ShowPage displays time", () => {
    render(<ShowPage show={sampleShow} />);
    expect(screen.getByText("Friday, 8:00 - 9:00 am")).toBeInTheDocument();
  });

  test("ShowPage displays genres", () => {
    render(<ShowPage show={sampleShow} />);
    expect(screen.getByText("Rock")).toBeInTheDocument();
  });

  test.skip("ShowPage displays playlists", () => {
    render(<ShowPage show={sampleShow} />);
    // TODO: update this test when we have playlist data
  });

});