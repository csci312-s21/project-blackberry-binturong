import  fetchMock  from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import WRMCWebsite from "../pages/index";

describe("Top level integration tests", () => {
  beforeEach(() => {
    render(<WRMCWebsite />);
  });

  test("Smoke test", async () => {
    await act(async () => {
      await fetchMock.flush(true);
    });
  });

  test("clicking on SOTW title brings up details page", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking on show from NextThreeShows brings up details page", () => {
    const showSnippets = screen.getAllByTestId("show snippet");
    fireEvent.click(showSnippets[0]);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking a NavBar item removes show details page", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
    const homePage = screen.getByText("Home");
    fireEvent.click(homePage);
    expect(screen.queryByTestId("show details page")).not.toBeInTheDocument();
    expect(screen.getByTestId("SOTW title")).toBeInTheDocument();
  });
});
