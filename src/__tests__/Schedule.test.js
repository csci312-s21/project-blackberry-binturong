import { render, screen, fireEvent } from "@testing-library/react";
import Schedule from "../components/Schedule.js";
import { sampleShows } from "../lib/test-utils.js";


describe("Schedule tests", () => {

  test("Weekly Schedule is rendered initially", () => {
    render(<Schedule shows={sampleShows}/>);
    //expect(screen.getByTestId("schedule")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

  test("Clicking headings changes from week to day view", () => {
    render(<Schedule shows={sampleShows}/>);
    fireEvent.click(screen.queryByText("Tuesday"));
    expect(screen.queryByText("Week")).toBeInTheDocument();
    //expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    //expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

});

