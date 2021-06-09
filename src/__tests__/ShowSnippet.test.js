import { render, screen } from "@testing-library/react";
import ShowSnippet from "../components/ShowSnippet.js";
import { sampleShow } from "../lib/test-utils.js";

describe("ShowSnippet tests", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <ShowSnippet show={sampleShow} />
        </tbody>
      </table>
    );
  });

  test("snippet displays title", () => {
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

  test("snippet displays time", () => {
    expect(screen.queryByText("8:00 - 9:00 am")).toBeInTheDocument();
  });

  test("snippet displays DJs", () => {
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
  });
});
