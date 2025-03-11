import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios('http://localhost:5000/api/products')
      setProducts(data)
    };
  
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((pro) => {
          return (
            <Col key={pro._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pro} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
