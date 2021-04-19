/*

Tests for LoginButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import LoginButton from "./LoginButton";

describe("LoginButton tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
  });

  test("login button returns correct action", () => {
    render(<LoginButton loggedIn={false} handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "In" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(true);
  });

  test("logout button returns correct action", () => {
    render(<LoginButton loggedIn handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "Out" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(false);
  });

});