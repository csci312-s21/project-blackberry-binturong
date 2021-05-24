import { sampleShows } from "../lib/test-utils.js";
import { render, screen } from "@testing-library/react";
import DaySchedule from "../components/DaySchedule.js";

describe("DaySchedule tests", () => {

  test("All shows are rendered", () => {
    render(<DaySchedule shows={sampleShows} day={"Friday"}/>);

    expect(screen.getByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.getByText("Kyle Hooker")).toBeInTheDocument();
    
    expect(screen.getByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.getByText("Daniel Levesque, Lachlan Pinney")).toBeInTheDocument();
  });
});
