import { render, screen } from "@testing-library/react";
import ShowSnippet from "../components/ShowSnippet.js";
import { sampleShow } from "../lib/test-utils.js";

describe("ShowSnippet tests", () => {

  test("snippet displays title", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

  test("snippet displays time", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("8:00 - 9:00 am")).toBeInTheDocument();
  });

  test("snippet displays DJs", () => {
    render(<ShowSnippet show={sampleShow}/>);

    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
  });

});