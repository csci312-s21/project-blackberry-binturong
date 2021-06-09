/*

Tests for NavBar.js

*/
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar tests", () => {
  test("Home has correct path", () => {
    render(<NavBar />);
    const about = screen.getByRole("link", { name: "Home" });
    expect(about).toBeInTheDocument();
    expect(about).toHaveAttribute("href", "/");
  });

  test("Schedule has correct path", () => {
    render(<NavBar />);
    const schedule = screen.getByRole("link", { name: "Schedule" });
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveAttribute("href", "/schedule");
  });

  test("About has correct path", () => {
    render(<NavBar />);
    const schedule = screen.getByRole("link", { name: "About" });
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveAttribute("href", "/about");
  });
});
