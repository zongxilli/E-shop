import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart);

	return (
		<>
			{/* //=-------------------- Details -------------------- */}
			{/* .......... Steps .......... */}
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							{/* .......... Shipping Details .......... */}
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address},{cart.shippingAddress.city},{' '}
								{cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country},
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							{/* .......... Payment Method Details .......... */}
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						{/* .......... Order Items Details .......... */}
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((forEachItem, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={forEachItem.image}
														alt={forEachItem.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${forEachItem.product}`}>
														{forEachItem.name}
													</Link>
												</Col>
												<Col md={4}>
													{forEachItem.qty} x ${forEachItem.price} = $
													{forEachItem.qty * forEachItem.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
