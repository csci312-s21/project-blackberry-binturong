import { render, screen } from "@testing-library/react";
import WeeklySchedule from "./WeeklySchedule.js";


const sampleShows = [{
    "title": "Sample Show 1",
    "DJs": ["Kyle Hooker"],
    "description": "sample description 1",
    "time": {
      "day": "F",
      "hour": 800,
      "duration": 1
    },
    "genres": ["Rock"],
    "id": "55"
  },
  {
    "title": "Sample Show 2",
    "DJs": ["Sam", "Cliff"],
    "description": "sample description 2",
    "time": {
      "day": "M",
      "hour": 900,
      "duration": 2
    },
    "genres": ["Rock"],
    "id": "56"
  }];

describe("WeeklySchedule tests", () => {

  test("All shows are rendered", () => {
    render(<WeeklySchedule show={sampleShows}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sam")).toBeInTheDocument();
    expect(screen.queryByText("Cliff")).toBeInTheDocument();
  });

});

