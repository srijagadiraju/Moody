import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router-dom";
import LandingPage from "./LandingPage";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LandingPage", () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockedNavigate.mockClear();
  });

  // Test 1: Component renders correctly
  test("renders landing page with all elements", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    // Check if title is present
    expect(screen.getByText("Moody")).toBeInTheDocument();

    // Check if description is present
    expect(
      screen.getByText("Your Personalized Mental Health Assistant")
    ).toBeInTheDocument();

    // Check if both buttons are present
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  // Test 2: Sign Up button navigation
  test("navigates to signup page with correct state when Sign Up is clicked", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/signup", {
      state: { isSignUp: true },
    });
  });

  // Test 3: Login button navigation
  test("navigates to signup page with correct state when Log In is clicked", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Log In");
    fireEvent.click(loginButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/signup", {
      state: { isSignUp: false },
    });
  });

  // Test 4: CSS classes are applied correctly
  test("applies correct CSS classes to elements", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Moody").closest("h1")).toHaveClass(
      "landing-title"
    );
    expect(
      screen.getByText("Your Personalized Mental Health Assistant").closest("p")
    ).toHaveClass("landing-description");

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("auth-button");
    });
  });
});
