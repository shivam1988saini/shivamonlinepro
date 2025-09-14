import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutUs from "./AboutUs";

describe("AboutUs", () => {
  test("renders About US heading", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /about us/i })).toBeInTheDocument();
  });

  test("renders Our Story section", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to india item/i)).toBeInTheDocument();
  });

  test("renders Our Values section", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    expect(screen.getByText(/our values/i)).toBeInTheDocument();
    expect(screen.getByText(/quality products/i)).toBeInTheDocument();
    expect(screen.getByText(/supporting artisans/i)).toBeInTheDocument();
    expect(screen.getByText(/exceptional customer service/i)).toBeInTheDocument();
  });

  test("renders Get In Touch With Us button with correct link", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /get in touch with us/i });
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/Contact");
  });
});
