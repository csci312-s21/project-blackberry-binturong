/*

Tests for LoginButton.js

*/
import { render, screen, fireEvent } from "@testing-library/react";
import LoginButton from "../components/LoginButton";
import { useSession, signIn, signOut } from "next-auth/client";

jest.mock("next-auth/client");

describe("LoginButton tests", () => {

  beforeEach(()=>{
    useSession.mockClear();
  });

  test("login button returns correct action", () => {
    useSession.mockReturnValueOnce([undefined, false]).mockReturnValueOnce([{user: {name: "username"}}, false]);
    render(<LoginButton/>);

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(signIn).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "logout" })).toBeInTheDocument();
  });

  test("logout button returns correct action", () => {
    useSession.mockReturnValueOnce([{user: {name: "username"}}, false]).mockReturnValueOnce([undefined, false]);
    render(<LoginButton/>);

    fireEvent.click(screen.queryByRole("button", { name: "logout" }));

    expect(signOut).toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "login" })).toBeInTheDocument();
  });

});