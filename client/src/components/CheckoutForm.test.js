import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import { act } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>)

    const header = screen.getByText(/checkout form/i)

    expect(header).toBeInTheDocument()

});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm/>)

    const firstNameInput = screen.getByLabelText(/first name:/i)
    const lastNameInput = screen.getByLabelText(/last name:/i)
    const addressInput = screen.getByLabelText(/address:/i)
    const cityInput = screen.getByLabelText(/city:/i)
    const stateInput = screen.getByLabelText(/state:/i)
    const zipInput = screen.getByLabelText(/zip:/i)

    fireEvent.change(firstNameInput, {target: {value: 'Tom'}})
    fireEvent.change(lastNameInput, {target: {value: 'Bauer'}})
    fireEvent.change(addressInput, {target: {value: '1234 Main Street'}})
    fireEvent.change(cityInput, {target: {value: 'Anytown'}})
    fireEvent.change(stateInput, {target: {value: 'MN'}})
    fireEvent.change(zipInput, {target: {value: '56789'}})

    const checkoutBtn = screen.getByTestId(/checkout-btn/i)
    fireEvent.click(checkoutBtn)


    const checkoutMsg = screen.findByText(/anytown, mn 56789/i)
    return expect(checkoutMsg).resolves.toBeInTheDocument()


   
});
