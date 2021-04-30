import  fetchMock  from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
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

describe("Start show button integration tests", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("Start show button only visible when logged in", () => {
    expect(screen.queryByRole("button", { name: "Start Show!" })).not.toBeInTheDocument();
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
    fireEvent.click(screen.queryByRole("button", { name: "Out" }));
    expect(screen.queryByRole("button", { name: "Start Show!" })).not.toBeInTheDocument();
  });

  test("Start show button takes user to playlist logger", () => {
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].key }});
    const startShowButton = screen.getByRole("button", { name: "Start Show!" })
    expect(startShowButton).toBeEnabled();
    fireEvent.click(startShowButton);
    expect(screen.getByRole("button", { name: "Add Row" })).toBeInTheDocument();
  });
});
