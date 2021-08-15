import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	// http://localhost:3000/cart/60d2c304ad43d793e0f27a1e?qty=2
	// location.search is the                            |<- ->|
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		// If they already logged in => directly go to shipping page
		// If they didn't login yet => go to login page
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Meta title={'Shopping Cart'} />
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{/* //=-------------------- Cart List -------------------- */}
				{/* If the shopping cart is empty => show {Message} with a go back {Link} */}
				{/* Else => show out list of items */}
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty
						<Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((forEachItem) => (
							<ListGroup.Item key={forEachItem.product}>
								<Row>
									{/* .......... Image .......... */}
									<Col md={2}>
										<Image
											src={forEachItem.image}
											alt={forEachItem.name}
											fluid
											rounded
										/>
									</Col>
									{/* .......... Url .......... */}
									<Col md={3}>
										<Link to={`/product/${forEachItem.product}`}>
											{forEachItem.name}
										</Link>
									</Col>
									{/* .......... Price .......... */}
									<Col md={2}>${forEachItem.price}</Col>
									{/* .......... Quantity .......... */}
									<Col md={2}>
										<Form.Control
											as="select"
											value={forEachItem.qty}
											onChange={(e) =>
												dispatch(
													addToCart(forEachItem.product, Number(e.target.value))
												)
											}>
											{[...Array(forEachItem.countInStock).keys()].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
													style={{ color: 'black' }}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									{/* .......... Delete Button .......... */}
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() =>
												removeFromCartHandler(forEachItem.product)
											}>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			{/* //=-------------------- Cart Overview -------------------- */}
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							{/* .......... Subtotal Items .......... */}
							<h2>
								Subtotal (
								{cartItems.reduce(
									(accumulator, eachItem) => accumulator + eachItem.qty,
									0
								)}
								) items
							</h2>
							{/* .......... Total Price .......... */}$
							{cartItems
								.reduce(
									(accumulator, eachItem) =>
										accumulator + eachItem.qty * eachItem.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							{/* .......... Checkout Button .......... */}
							<Button
								type="button"
								className="btn-block"
								disable={cartItems.length === 0}
								onClick={checkoutHandler}>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
