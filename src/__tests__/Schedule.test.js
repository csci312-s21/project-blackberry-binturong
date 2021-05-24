import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleContainer from "../components/ScheduleContainer.js";
import { sampleShows } from "../lib/test-utils.js";

describe("Schedule tests", () => {

  test("Weekly Schedule is rendered initially", () => {
    render(<ScheduleContainer shows={sampleShows}/>);
    //expect(screen.getByTestId("schedule")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });

  test("Clicking headings changes from week to day view", () => {
    render(<ScheduleContainer shows={sampleShows} />);
    fireEvent.click(screen.queryByText("Tuesday"));
    expect(screen.queryByText("Week")).toBeInTheDocument();
    //expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    //expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });
});
