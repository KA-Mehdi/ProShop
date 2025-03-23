import React from "react";
import { useState } from "react";
import {  Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/carteSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const ShippingAddress = cart.ShippingAddress || {};

  const [address, setAddress] = useState(ShippingAddress.address || "");
  const [city, setCity] = useState(ShippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(ShippingAddress.postalCode || "");
  const [country, setCountry] = useState(ShippingAddress.country || "");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    console.log(cart);
    navigate('/payment')
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2  /> 
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2  ">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
