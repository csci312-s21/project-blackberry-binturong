import fetchMock from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import WRMCWebsite from "../pages/index";

describe("Top level integration tests", () => {
  let _Date;

  beforeAll(() => {
    _Date = Date;
  });

  afterAll(() => {
    Date = _Date; // eslint-disable-line
  });

  test("Smoke test", async () => {
    await act(async () => {
      await fetchMock.flush(true);
    });
  });

  test("clicking on SOTW title brings up details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking on show from NextThreeShows brings up details page", () => {
    // mock date.now function for deterministic testing of NextThreeShows
    Date.now = jest.fn(() => new Date(2021, 3, 27, 17));
    render(<WRMCWebsite />);
    const showSnippets = screen.getAllByTestId("show snippet");
    fireEvent.click(showSnippets[0]);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking a NavBar item removes show details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
    const homePage = screen.getByText("Home");
    fireEvent.click(homePage);
    expect(screen.queryByTestId("show details page")).not.toBeInTheDocument();
    expect(screen.getByTestId("SOTW title")).toBeInTheDocument();
  });
});
