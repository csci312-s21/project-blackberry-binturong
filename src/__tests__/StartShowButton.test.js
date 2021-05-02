/*

Tests for StartShowButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
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
    expect(options).toHaveLength(sampleShows.length + 1);
  });

  test("start show button disabled initally", () => {
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeDisabled();
  });

  test("start show returns correct show id", () => {
    const sampleShow = sampleShows[0];
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: sampleShow.id }});
    const startShowButton = screen.getByRole("button", { name: "Start Show!" });
    expect(startShowButton).toBeEnabled();
    fireEvent.click(startShowButton);
    expect(handler).toHaveBeenCalledWith(sampleShow.id);
  });
});