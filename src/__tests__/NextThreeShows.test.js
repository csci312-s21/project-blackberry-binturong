import { render, screen } from "@testing-library/react";
import NextThreeShows from "../components/NextThreeShows.js";
import { sampleShows } from "../lib/test-utils.js";

describe("NextThreeShows tests", () => {

  test("three shows are displayed", () => {
    render(<NextThreeShows shows={sampleShows.slice(0,3)}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByText("Sample Show 4")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
  });

  test("two shows are displayed", () => {
    render(<NextThreeShows shows={sampleShows.slice(1,3)}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("one show is displayed", () => {
    const a = new Array();
    a[0] = sampleShows[2];
    render(<NextThreeShows shows={a}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByText("Sample Show 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("zero shows are displayed", () => {
    const c = new Array();
    render(<NextThreeShows shows = {c}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryByText("Sample Show 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });


  test("Thats all message correctly displayed", () => {
    render(<NextThreeShows shows={sampleShows.slice(0,3)}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByText("Sample Show 4")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).not.toBeInTheDocument();
  });
});