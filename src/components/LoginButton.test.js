import { render, screen, fireEvent } from "@testing-library/react";
import LoginButton from "./LoginButton";

describe("LoginButton tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
  });

  test("Clicking login button switches between login and logout", async () => {
    render(<LoginButton loggedIn={false} handleClick={handler}/>);

    let login = screen.queryByRole("button", { name: "In" });
    expect(login).toBeInTheDocument();

    fireEvent.click(login);
    login = screen.queryByRole("button", { name: "In" });
    expect(login).not.toBeInTheDocument();
    let logout = screen.queryByRole("button", { name: "Out" });
    expect(logout).toBeInTheDocument();

    fireEvent.click(logout);
    login = screen.queryByRole("button", { name: "In" });
    expect(login).toBeInTheDocument();
    logout = screen.queryByRole("button", { name: "Out" });
    expect(logout).not.toBeInTheDocument();
  });

  test("login button returns correct action", () => {
    render(<LoginButton loggedIn={false} handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "In" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(true);
  });

  test("logout button returns correct action", () => {
    render(<LoginButton loggedIn={true} handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "Out" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(false);
  });
  

});