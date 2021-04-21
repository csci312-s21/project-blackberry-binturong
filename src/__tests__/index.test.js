import  fetchMock  from "fetch-mock-jest";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";

describe("Top level integration tests", () => {
  test("Smoke test", async () => {
    render(<Home />);
    await act(async () => {
      await fetchMock.flush(true);
    });
  });
});
