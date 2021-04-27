import { render, screen } from "@testing-library/react";
import NextThreeShows from "../components/NextThreeShows.js";
import { sampleShows } from "../lib/test-utils.js";

describe("NextThreeShows tests", () => {
  let _Date;

  beforeAll(() => {
    _Date = Date; // Save original date module
  });

  afterAll(() => {
    Date = _Date; // eslint-disable-line
  });

  test("three shows are displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 7));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("two shows are displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 8));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByText("Sample Show 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("one show is displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 9));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByText("Sample Show 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("zero shows are displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 10));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryByText("Sample Show 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("current show not displayed", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 10));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
  });

  test("4 upcoming shows shows correct info", () => {
    Date.now = jest.fn(() => new Date(2021, 3, 16, 6));
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByText("Sample Show 4")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 2")).toBeInTheDocument();
    expect(screen.queryByText("Sample Show 3")).not.toBeInTheDocument();
    expect(screen.queryByText("That's all for today!")).not.toBeInTheDocument();
  });

});