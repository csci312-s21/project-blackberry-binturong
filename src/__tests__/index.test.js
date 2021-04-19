import { render, screen, fireEvent } from "@testing-library/react";
import  fetchMock  from "fetch-mock-jest";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";

const selectPage = async (page) => {
  const section = screen.getByText(page);
  fireEvent.click(section);

  //await screen.findByText();
};

describe("Top level integration tests", () => {
  test("Smoke test", async () => {
    render(<Home />);
    await act(async () => {
      await fetchMock.flush(true);
    });
  });
});

describe("NavBar tests", () => {
  test("NavBar highlights current page", () => {
    
  });

  test("Current page is the same one as state", () => {

  });
})
