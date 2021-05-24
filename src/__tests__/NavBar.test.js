/*

Tests for NavBar.js

*/
import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout";
import Schedule from "../components/ScheduleContainer";
import About from "../pages/about";
import { sampleShows } from "../lib/test-utils.js";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("NavBar tests", ()=>{
  const handler = jest.fn();

  beforeEach(() => {
    useSession.mockClear();
    useSession.mockReturnValue([undefined, false]);
    handler.mockReset();
  });

  test("About page is in place", ()=>{
    render(<About />);

    expect(screen.getByRole("heading", {name:"About"})).toBeInTheDocument();
    const home = screen.getByRole("link", {name:"Home"});
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute("href", "/");
  });

  test("Home links to About", ()=>{
    render(<Layout title=""/>);

    const about = screen.getByRole("link", {name:"About"});
    expect(about).toBeInTheDocument();
    expect(about).toHaveAttribute("href", "/about");
  });

  test("Schedule page is in place", ()=>{
    render(<Schedule shows = {sampleShows}/>);
    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  test("Home links to Schedule", ()=>{
    render(<Layout />);

    const schedule = screen.getByRole("link", {name:"Schedule"});
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveAttribute("href", "/schedule");
  });
});
