import { render, screen } from "@testing-library/react";
import DayShow from "../components/WeeklyShow.js";
import { sampleShow } from "../lib/test-utils.js";

const color = "#F50046";

describe("DayShow tests", () => {

  test("Show is rendered", () => {
    render(<DayShow show={sampleShow}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
  });


  test("Show is correct color", () => {
    const { container } = render(<DayShow show={sampleShow}/>);
    expect(container.firstChild).toHaveStyle(`background-color: ${color}`);
  });

});
