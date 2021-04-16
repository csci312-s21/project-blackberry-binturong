import { render, screen } from "@testing-library/react";
import NextThreeShows from "../components/NextThreeShows.js";

const sampleShows = [
  {
    "title": "Rewind with Kyle",
    "DJs": ["Kyle Hooker"],
    "description": "A mixture of oldies music up through the 80’s and 90’s, this show will feature a mixture of several genres: folk, R&B, Rock, Pop/Rock, and Punk. There will be a nice balance of classic hits in addition to many less well known, deeper tracks.",
    "time": {
      "day": "F",
      "hour": 1900,
      "duration": 1
    },
    "genres": ["Rock"],
    "id": "55"
  },
  {
    "title": "A Misfit’s Guide to Middlebury",
    "DJs": ["Daniel Levesque","Lachlan Pinney"],
    "description": "Did you know there used to be regular brawls in Old Chapel during the 1890s? Ever heard of Abortion Underground: a secret Middlebury club in the 60s and 70s that took women in Vermont to Canada so they could access safe and legal abortions? Join Lachlan and Dan as they…",
    "time": {
      "day": "F",
      "hour": 2100,
      "duration": 1
    },
    "genres": ["News"],
    "id": "56"
  },
  {
    "title": "Simps and Subpar Stanzas",
    "DJs": ["Emma Tzotschew","Andrew Grossman"],
    "description": "Have you ever wanted to suffer from second hand embarrassment so badly that you turned on the radio?! Tune in to Simps and Subpar Stanzas as we talk through past romantic failures, current romantic interests? prospects? Proc crushes (jk, no one goes to Proc), featuring simp-y songs, the occasional simp…",
    "time": {
      "day": "F",
      "hour": 2200,
      "duration": 1
    },
    "genres": ["Folk","Indie","Talk"],
    "id": "57"
  },
]

describe("NextThreeShows tests", () => {
  let _Date;
  beforeAll(() => {
    _Date = Date; // Save original date module
  });

  afterAll(() => {
    Date = _Date; // Reset Date
  });

  beforeEach(() => {
    Date.getDay = jest.fn(() => 5);
  });

  test("three shows are displayed", () => {
    Date.getHours = jest.fn(() => 18);
    render(<NextThreeShows shows={sampleShows}/>);

    const shows = screen.queryAllByRole("listitem");
    expect(shows).toHaveLength(sampleShows.length);
    expect(shows[0]).toContain("Rewind with Kyle");
  });

  test("two shows are displayed", () => {
    Date.getHours = jest.fn(() => 19);
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("Rewind with Kyle")).not.toBeInTheDocument();
    expect(screen.queryByText("A Misfit’s Guide to Middlebury")).toBeInTheDocument();
    expect(screen.queryByText("Simps and Subpar Stanzas")).toBeInTheDocument();
  });

  test("one show is displayed", () => {
    Date.getHours = jest.fn(() => 21);
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("Rewind with Kyle")).not.toBeInTheDocument();
    expect(screen.queryByText("A Misfit’s Guide to Middlebury")).not.toBeInTheDocument();
    expect(screen.queryByText("Simps and Subpar Stanzas")).toBeInTheDocument();
  });

  test("zero shows are displayed", () => {
    Date.getHours = jest.fn(() => 22);
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("Rewind with Kyle")).not.toBeInTheDocument();
    expect(screen.queryByText("A Misfit’s Guide to Middlebury")).not.toBeInTheDocument();
    expect(screen.queryByText("Simps and Subpar Stanzas")).not.toBeInTheDocument();
  });

  test("no shows message displayed", () => {
    Date.getHours = jest.fn(() => 22);
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("That's all for today!")).toBeInTheDocument();
  });

  test("current show not displayed", () => {
    Date.getHours = jest.fn(() => 18);
    render(<NextThreeShows shows={sampleShows}/>);

    expect(screen.queryByText("Simps and Subpar Stanzas")).not.toBeInTheDocument();
  });

});