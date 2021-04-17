import { render, screen } from "@testing-library/react";
import NextThreeShows from "./NextThreeShows.js";

const sampleShows = [
  {
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
    "DJs": ["Daniel Levesque","Lachlan Pinney"],
    "description": "sample description 2",
    "time": {
      "day": "F",
      "hour": 900,
      "duration": 1
    },
    "genres": ["News"],
    "id": "56"
  },
  {
    "title": "Sample Show 3",
    "DJs": ["Emma Tzotschew","Andrew Grossman"],
    "description": "sample description 3",
    "time": {
      "day": "F",
      "hour": 1000,
      "duration": 1
    },
    "genres": ["Folk","Indie","Talk"],
    "id": "57"
  },
  {
    "title": "Sample Show 4",
    "DJs": ["Emma Tzotschew","Andrew Grossman"],
    "description": "sample description 4",
    "time": {
      "day": "F",
      "hour": 700,
      "duration": 1
    },
    "genres": ["Folk","Indie","Talk"],
    "id": "58"
  }
]

describe("NextThreeShows tests", () => {
  let _Date;

  beforeAll(() => {
    _Date = Date; // Save original date module
  });

  afterAll(() => {
    Date = _Date; // Reset Date
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