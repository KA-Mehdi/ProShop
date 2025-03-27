import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';


const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { 
        data:order,
        refresh,
        isLoading,
        error
    } = useGetOrderDetailsQuery(orderId)


    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger' />
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> 
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> 
                                {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingaddress.address}, {order.shippingaddress.city}{ ' ' }
                                {order.shippingaddress.postalCode}, { ' ' }
                                {order.shippingaddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message></Message>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen