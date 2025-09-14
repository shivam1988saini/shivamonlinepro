import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddressConfirmation from "./AddressConfirmation";

describe("AddressConfirmation", () => {
  function setup() {
    return render(
      <MemoryRouter>
        <AddressConfirmation />
      </MemoryRouter>
    );
  }

  test("renders Shipping Address section with user details", () => {
    setup();
    expect(screen.getByText(/shipping address/i)).toBeInTheDocument();
    expect(screen.getByText(/your address/i)).toBeInTheDocument();
    expect(screen.getByText(/shivam prakash saini/i)).toBeInTheDocument();
    expect(screen.getByText(/ramji nagar/i)).toBeInTheDocument();
    expect(screen.getByText(/agra/i)).toBeInTheDocument();
    expect(screen.getByText(/up/i)).toBeInTheDocument();
    expect(screen.getByText(/282001/i)).toBeInTheDocument();
    expect(screen.getByText(/india/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 9528885228/i)).toBeInTheDocument();
  });

  test("renders Change Address button", () => {
    setup();
    expect(screen.getByRole("button", { name: /change address/i })).toBeInTheDocument();
  });

  test("renders Payment Method section and options", () => {
    setup();
    expect(screen.getByText(/payment method/i)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText(/payment method/i));
    expect(screen.getByText(/credit card/i)).toBeInTheDocument();
    expect(screen.getByText(/paypal/i)).toBeInTheDocument();
    expect(screen.getByText(/bank transfer/i)).toBeInTheDocument();
    expect(screen.getByText(/upi/i)).toBeInTheDocument();
  });

  test("shows credit card fields when Credit Card is selected", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText(/payment method/i));
    fireEvent.click(screen.getByText(/credit card/i));
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
  });

  test("shows PayPal info when PayPal is selected", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText(/payment method/i));
    fireEvent.click(screen.getByText(/paypal/i));
    expect(screen.getByText(/please log in to your paypal account/i)).toBeInTheDocument();
  });

  test("shows Bank Transfer info when Bank Transfer is selected", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText(/payment method/i));
    fireEvent.click(screen.getByText(/bank transfer/i));
    expect(screen.getByText(/please transfer the payment/i)).toBeInTheDocument();
  });

  test("shows UPI field when UPI is selected", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText(/payment method/i));
    fireEvent.click(screen.getByText(/upi/i));
    expect(screen.getByLabelText(/upi id/i)).toBeInTheDocument();
  });

  test("Confirm Payment button is disabled until checkbox is checked", () => {
    setup();
    const confirmBtn = screen.getByRole("button", { name: /confirm payment/i });
    expect(confirmBtn).toBeDisabled();
    const checkbox = screen.getByLabelText(/i confirm that my address and payment details are correct/i);
    fireEvent.click(checkbox);
    expect(confirmBtn).not.toBeDisabled();
  });

  test("Change Address button switches to address edit mode", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /change address/i }));
    expect(screen.getByText(/address confirmation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit address/i })).toBeInTheDocument();
  });

  test("Edit Address button enables editing", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /change address/i }));
    fireEvent.click(screen.getByRole("button", { name: /edit address/i }));
    expect(screen.getByLabelText(/full name/i)).not.toBeDisabled();
    expect(screen.getByLabelText(/street address/i)).not.toBeDisabled();
  });

  test("Cancel button returns to main view", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /change address/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.getByText(/shipping address/i)).toBeInTheDocument();
  });
});