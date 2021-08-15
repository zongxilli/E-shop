import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	// const formatter = new Intl.NumberFormat('en-US', {
	// 	style: 'currency',
	// 	currency: 'CAD',
	// 	minimumFractionDigits: 2,
	// });

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 20);
	cart.taxPrice = addDecimals(Number((0.13 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}
		// eslint-disable-next-line
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			<Meta title={'Place Order'} />
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
									{cart.cartItems.map((forEachItem) => (
										<ListGroup.Item key={forEachItem.product}>
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
				{/* //=-------------------- Summary -------------------- */}
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							{/* .......... Items .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>CA$ {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Tax .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Tax (13%)</Col>
									<Col>CA$ {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Shipping .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Shipping (free over 100)</Col>
									<Col>CA$ {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Total .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>CA$ {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* .......... Check if has error .......... */}
							<ListGroup.Item>
								{error && <Message variant="danger">{error}</Message>}
							</ListGroup.Item>

							{/* .......... Place Order Button .......... */}
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
