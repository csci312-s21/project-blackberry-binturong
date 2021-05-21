import { sampleShows } from "../lib/test-utils.js";
import { render, screen } from "@testing-library/react";
import DaySchedule from "../components/WeeklySchedule.js";

describe("DaySchedule tests", () => {

  test("All shows are rendered", () => {
    render(<DaySchedule shows={sampleShows}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Daniel Levesque, Lachlan Pinney")).toBeInTheDocument();
  });

});

