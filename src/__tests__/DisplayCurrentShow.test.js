/*

Tests for DisplayCurrentShow.js

*/

import { render, screen } from "@testing-library/react";
import DisplayCurrentShow from "../components/DisplayCurrentShow.js";
import { sampleShows } from "../lib/test-utils.js";

describe("DisplayCurrentShow tests", () => {
  let _Date;

  beforeAll(() => {
    _Date = Date; // Save original date module
  });

  afterAll(() => {
    Date = _Date; // eslint-disable-line
  });

  test.only("current show is displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 8));
    render(<DisplayCurrentShow shows={sampleShows}/>);

    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

});