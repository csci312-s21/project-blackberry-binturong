import { render, screen, fireEvent } from "@testing-library/react";
import DayShow from "../components/DayShow.js";
import { sampleShow } from "../lib/test-utils.js";
import { colors } from "../lib/component-utils.js";

describe("DayShow tests", () => {

  test("Show is rendered", () => {
    render(<DayShow show={sampleShow}/>);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Kyle Hooker")).toBeInTheDocument();
  });

  test("Show is correct color", () => {
    const { container } = render(<DayShow show={sampleShow}/>);
    expect(container.firstChild).toHaveStyle(`background-color: ${colors[sampleShow.genres[0]]}`);
  });

  test("description appears on mouse enter", () => {
    render(<DayShow show={sampleShow}/>);
    const show = screen.getByText(sampleShow.title);
    expect(show).toBeInTheDocument();
    fireEvent.mouseEnter(show);
    expect(screen.getByText(sampleShow.description)).toBeInTheDocument();
    expect(screen.queryByText(sampleShow.title)).not.toBeInTheDocument();
  });

  test("description disappears on mouse leave", () => {
    render(<DayShow show={sampleShow}/>);
    fireEvent.mouseEnter(screen.getByText(sampleShow.title));
    fireEvent.mouseLeave(screen.getByText(sampleShow.description));
    expect(screen.queryByText(sampleShow.description)).not.toBeInTheDocument();
    expect(screen.getByText(sampleShow.title)).toBeInTheDocument();
  });

});
