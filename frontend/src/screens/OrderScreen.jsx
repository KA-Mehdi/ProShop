import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import toast from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log("this is " + JSON.stringify(order));

  const [payOrder, { isLoading: loadinPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!orderPaypal && !loadingPaypal && paypal.clientId) {
      const loadingPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
            loadingPaypalScript()
        }
      }
    }
  }, [order, paypal,paypalDispatch, loadingPaypal, errorPayPal ]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order?.user?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message>Delivered on {order?.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message>Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order?.orderItems?.map((item, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item?.image} alt={item?.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
