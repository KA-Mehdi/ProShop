import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCard } from "../slices/carteSlice";

const CartScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async(product, qty) => {
        dispatch(addToCart({...product, qty}))
  }
  const removeFromCardHandler = async(id) => {
    console.log('clicked')
        dispatch(removeFromCard(id))
  }
  
   
  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}> Shoppping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="danger">
              Your cart is empty <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                        <Button  onClick={() => removeFromCardHandler(item._id)} type="button" variant='light' style={{border: 'none'}} >
                            <FaTrash />
                        </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col>
          <Card >
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>
                        subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                    </h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroupItem>
                    <Button type="button" className="btn-block" disabled={cartItems.length === 0} variant="light">
                        Proceed To Checkout
                    </Button>
                </ListGroupItem>


            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
