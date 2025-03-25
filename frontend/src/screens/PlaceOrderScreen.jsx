import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form, Row, Col } from "react-bootstrap";

const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('./shipping');
        } else if (!cart.paymentMethod) {
            navigate('./payment')
        }
    }, [cart.paymentMethod,cart.shippingAddress, navigate])
    return <>
        <CheckoutSteps step1 step2 step3 step4/>  
        <Row>
            <Col md={8}>com</Col>
        </Row>
        
    </>
}


export default PlaceOrderScreen;