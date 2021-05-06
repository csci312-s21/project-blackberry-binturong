/*

Tests for DisplayCurrentShow.js

*/

import { render, screen } from "@testing-library/react";
import DisplayCurrentShow from "../components/DisplayCurrentShow.js";
import { sampleShow } from "../lib/test-utils.js";

describe("DisplayCurrentShow tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
  });

  test.only("current show is displayed", () => {
    
    render(<DisplayCurrentShow show={sampleShow} handleClick={handler}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

});