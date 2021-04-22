import { render, screen } from "@testing-library/react";
import ShowOTW from "./ShowOTW.js"; 

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
  };

describe("ShowOTW tests", () => {
  test("Show is displayed", () => {
    render(<ShowOTW show={sampleShow}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });
});