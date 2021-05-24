/*

Tests for PlayButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "../components/PlayButton";

describe("PlayButton tests", () => {
  test("displays component", () => {
    render(<PlayButton />);
    expect(screen.queryByText("LISTEN NOW")).toBeVisible();
  });

  test("opens link to the boombox", () => {
    render(<PlayButton />);
    global.open = jest.fn();
    fireEvent.click(screen.queryByText("LISTEN NOW"));
    expect(global.open).toHaveBeenCalled();
  });
});
