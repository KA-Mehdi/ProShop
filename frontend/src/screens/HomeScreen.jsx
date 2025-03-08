import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return <>
    <h1>Latest Products</h1>
    <Row>
        {products.map(pro=> {
            return (
            <Col key={pro._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={pro} />
            </Col>
            )
        })}
    </Row>
  </>
}

export default HomeScreen;
