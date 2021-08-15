import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import Meta from '../components/Meta';

const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || order._id !== orderId || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		}
		// If order is not paid
		else if (!order.isPaid) {
			// Check if the paypal script is there, if it is not there
			if (!window.paypal) {
				// we add paypalScript
				addPayPalScript();
			} else {
				// we set SDK to be ready
				setSdkReady(true);
			}
		}

		// if (!order || order._id !== orderId) {
		// 	dispatch(getOrderDetails(orderId));
		// }
	}, [order, orderId, dispatch, successPay, successDeliver]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
		<Meta title={'Order Summary'} />
			<h1>Order {order._id}</h1>
			{/* //=--------------------  Order Details -------------------- */}
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							{/* .......... Shipping Details .......... */}
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>{' '}
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address},{order.shippingAddress.city},{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country},
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.DeliveredAt}{' '}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							{/* .......... Payment Method Details .......... */}
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid on {order.paidAt} </Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						{/* .......... Order Items Details .......... */}
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((forEachItem) => (
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
									<Col>CA$ {order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Tax .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Tax (13%)</Col>
									<Col>CA$ {order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Shipping .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Shipping (free over 100)</Col>
									<Col>CA$ {order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* .......... Total .......... */}
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>CA$ {order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type="button"
											className="btn btn-block"
											onClick={deliverHandler}>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
