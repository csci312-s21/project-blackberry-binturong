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
    render(<LoginButton/>);
    
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    fireEvent.click(screen.queryByRole("button", { name: "login" }));

    expect(signIn).toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "logout" })).toBeInTheDocument();
  });

  test("logout button returns correct action", () => {
    render(<LoginButton/>);

    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    fireEvent.click(screen.queryByRole("button", { name: "login" }));

    useSession.mockReturnValue([undefined, false]);
    fireEvent.click(screen.queryByRole("button", { name: "logout" }));

    expect(signOut).toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "login" })).toBeInTheDocument();
  });

});