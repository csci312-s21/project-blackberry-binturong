/*

Tests for PlayButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "./PlayButton";

describe("PlayButton tests", () => {
  
  test("displays component", () => {
    render(<PlayButton/>);
    expect(screen.queryByText("LISTEN NOW")).toBeVisible();
  });

   test("opens link to the boombox", () => {
    render(<PlayButton/>);
    global.open = jest.fn();
    fireEvent.click(screen.queryByRole("button", { name: "LISTEN NOW" }));
    expect(global.open).toHaveBeenCalled();

   })

});