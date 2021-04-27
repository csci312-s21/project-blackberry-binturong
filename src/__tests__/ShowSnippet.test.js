import { render, screen } from "@testing-library/react";
import ShowSnippet from "../components/ShowSnippet.js";

const sampleShow = {
  "title": "Sample Show",
  "DJs": ["Joe Schmo, ABC"],
  "description": "sample description",
  "time": {
    "day": "F",
    "hour": 800,
    "duration": 1
  },
  "genres": ["Rock"],
  "id": 55
}

describe("ShowSnippet tests", () => {

  test("snippet displays title", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("Sample Show")).toBeInTheDocument();
  });

  test("snippet displays time", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("8:00 - 9:00 am")).toBeInTheDocument();
  });

  test("snippet displays DJs", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("Joe Schmo, ABC")).toBeInTheDocument();
  });

});