/*

Tests for NavBar.js

*/
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import Schedule from "../pages/schedule";
import About from "../pages/about";

describe("NavBar tests", ()=>{
  const handler = jest.fn();

  beforeEach(() => {
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
    render(<Home />);

    const about = screen.getByRole("link", {name:"About"});
    expect(about).toBeInTheDocument();
    expect(about).toHaveAttribute("href", "/about");
  });

  test("Schedule page is in place", ()=>{
    render(<Schedule />);

    expect(screen.getByRole("row", {name:"Monday Tuesday Wednesday Thursday Friday Saturday Sunday"})).toBeInTheDocument();
    const home = screen.getByRole("link", {name:"Home"});
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute("href", "/");
  });

  test("Home links to Schedule", ()=>{
    render(<Home />);

    const schedule = screen.getByRole("link", {name:"Schedule"});
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveAttribute("href", "/schedule");
  });
});
