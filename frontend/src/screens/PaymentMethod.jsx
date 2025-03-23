import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../slices/carteSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress.address ||  !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate])



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>
            <Col>
              <Form.Check
                type="radio"
                className="my-2"
                label="paypal or credit card"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Label>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethod;
