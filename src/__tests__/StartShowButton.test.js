/*

Tests for StartShowButton.js

*/
import { render, screen } from "@testing-library/react";
import StartShowButton from "../components/StartShowButton.js";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("StartShowButton tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    useSession.mockClear();
    handler.mockReset();
    useSession.mockReturnValue([{ user: { name: "name" } }, false]);
    render(<StartShowButton/>);
  });
  
  // test("all show titles displayed", () => {
  //   const options = screen.queryAllByRole("option");
  //   sampleShows.forEach((show) => options.includes(show.title));
  //   expect(options).toHaveLength(1);
  // });

  test("start show button disabled initally", () => {
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeDisabled();
  });

  // test("button enabled on valid selectioon", () => {
  //   const selector = screen.getByRole("combobox");
  //   fireEvent.change(selector, { target: { value: groupShow.id }});
  //   const startShowButton = screen.getByRole("button", { name: "Start Show!" });
  //   expect(startShowButton).toBeEnabled();
  // });
});
