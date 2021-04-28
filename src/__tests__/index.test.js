import  fetchMock  from "fetch-mock-jest";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";

describe("Top level integration tests", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("Smoke test", async () => {
    await act(async () => {
      await fetchMock.flush(true);
    });
  });
});

describe("Create playlists tests", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("Entering song adds to playlist", () => {
    
  });

  test("Updating song attribute updates song", () => {
    
  });

  test("Deleting entered song removes it from playlist", () => {
    
  });
});