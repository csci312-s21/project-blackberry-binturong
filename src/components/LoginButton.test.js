import { render, screen, fireEvent } from "@testing-library/react";
import LoginButton from "./LoginButton";

describe("LoginButton tests", () => {
  const handler = jest.fn();
  
  beforeEach(() => {
    handler.mockReset();
  });

  test("Clicking login button switches between login and logout", () => {
    render(<LoginButton handleClick={handler}/>);

    let login = screen.queryByRole("button", { name: "login" });
    expect(login).toBeInTheDocument();

    fireEvent.click(login);
    expect(login).not.toBeInTheDocument();
    let logout = screen.queryByRole("button", { name: "logout" });
    expect(logout).toBeInTheDocument();

    fireEvent.click(logout);
    login = screen.queryByRole("button", { name: "login" });
    expect(login).toBeInTheDocument();
    logout = screen.queryByRole("button", { name: "logout" });
    expect(logout).not.toBeInTheDocument();
  });

  test("login button returns correct action", () => {
    render(<LoginButton, handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "login" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith("login");
  });

  test("logout button returns correct action", () => {
    render(<LoginButton, handleClick={handler}/>);

    fireEvent.click(screen.queryByRole("button", { name: "login" }));
    fireEvent.click(screen.queryByRole("button", { name: "logout" }));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith("logout");
  });
  

});