/*

Tests for NavBar.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  const pages = ["Home", "Blog", "Schedule", "Community", "About"];
  const startPage = "Home";
  const newPage = "Blog";

  test("Clicking the NavBar updates the page", () => {
    render(<NavBar pageList={pages} currentPage={startPage} setCurrentPage={handler}/>);

    fireEvent.click(screen.getByText(newPage));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(newPage);
  });

  test("All possible page links are rendered", () => {
    render(<NavBar pageList={pages} currentPage={startPage} setCurrentPage={handler}/>);
    
    pages.forEach(p => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });

});