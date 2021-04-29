import { render, screen } from "@testing-library/react";
import ShowOTW from "../components/ShowOTW.js"; 
import { sampleShow } from "../lib/test-utils.js";

describe("ShowOTW tests", () => {
  test("Show is displayed", () => {
    render(<ShowOTW show={sampleShow}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
  });
});