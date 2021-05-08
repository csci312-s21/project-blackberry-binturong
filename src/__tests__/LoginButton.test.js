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
    useSession.mockReturnValue([undefined, false]);
    render(<LoginButton/>);

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(signIn).toHaveBeenCalled();
  });

  test("logout button returns correct action", () => {
    useSession.mockReturnValue([{user: {name: "username"}}, false]);
    render(<LoginButton/>);

    fireEvent.click(screen.getByRole("button", { name: "logout" }));

    expect(signOut).toHaveBeenCalled();
  });

});