/*

Tests for PlayButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "./PlayButton";

describe("PlayButton tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
  });

  test("displays component", () => {
    render(<PlayButton/>);
    expect(screen.queryByText("LISTEN NOW")).toBeVisible();
  });
});