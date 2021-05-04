import { render, screen } from "@testing-library/react";
import WeeklyShow from "./WeeklyShow.js";

const sampleShow = {
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
}

const color = "#F50046";

describe("WeeklyShow tests", () => {

  test("Show is rendered", () => {
    render(<WeeklyShow show={sampleShow}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
  });


  test("Show is correct color", () => {
    const { container } = render(<WeeklyShow show={sampleShow}/>);
    expect(container.firstChild).toHaveStyle(`background-color: ${color}`);
  });

});
