/*

Tests for StartShowButton.js

*/
import { render, screen } from "@testing-library/react";
import StartShowButton from "../components/StartShowButton.js";
import { sampleShows } from "../lib/test-utils.js";

describe("StartShowButton tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<StartShowButton userShows={sampleShows} startShow={handler}/>);
  });

  test("all show titles displayed", () => {
    const options = screen.queryAllByRole("option");
    sampleShows.forEach((show) => options.includes(show.title));
    expect(options).toHaveLength(sampleShows.length);
  });
});