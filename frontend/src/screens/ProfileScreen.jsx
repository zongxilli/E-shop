import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import Meta from '../components/Meta';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	// REDUCER: userDetails <- store.js <- userDetails Reducer
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	// REDUCER: userLogin <- store.js <- userLogin Reducer
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// REDUCER: userUpdateProfile <- store.js <- userUpdateProfile Reducer
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	// REDUCER: orderListMy <- store.js <- orderListMy Reducer
	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// Added < !user || > for user is undefined error (it needs time to fetch user)
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
				dispatch(listMyOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		// Password does not match ConfirmPassword
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			// ACTION: userUpdateProfile <- userUpdateProfile Action
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Meta title={'Profile'} />
			<Col md={3}>
				<h2>User Profile</h2>

				{/* If message exists => show error message */}
				{message && <Message variant="danger">{message}</Message>}

				{/* If error exists => show error message */}
				{error && <Message variant="danger">{error}</Message>}

				{/* If success exists => show success message */}
				{success && <Message variant="success">Profile Updated</Message>}

				{/* If loading => show Loader */}
				{loading && <Loader />}

				{/* //=-------------------- User Profile Form -------------------- */}
				<Form onSubmit={submitHandler}>
					{/* .......... User Name .......... */}
					<Form.Group controlId="name">
						<Form.Label>User Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>

					{/* .......... Email Address .......... */}
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>

					{/* .......... Password .......... */}
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>

					{/* .......... Confirm Password .......... */}
					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) =>
								setConfirmPassword(e.target.value)
							}></Form.Control>
					</Form.Group>

					{/* .......... Register Button .......... */}
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			{/* //=-------------------- My Orders -------------------- */}
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							{/* .......... First Row .......... */}
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						{/* .......... Body Rows .......... */}
						<tbody>
							{orders.map((forEachOrder) => (
								<tr key={forEachOrder._id}>
									{/* .......... ID .......... */}
									<td>{forEachOrder._id}</td>
									{/* .......... DATE .......... */}
									<td>{forEachOrder.createdAt.substring(0, 10)}</td>
									{/* .......... TOTAL .......... */}
									<td>{forEachOrder.totalPrice}</td>
									{/* .......... PAID .......... */}
									<td>
										{forEachOrder.isPaid ? (
											forEachOrder.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									{/* .......... DELIVERED .......... */}
									<td>
										{forEachOrder.isDelivered ? (
											forEachOrder.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									{/* .......... Details Button .......... */}
									<td>
										<LinkContainer to={`/order/${forEachOrder._id}`}>
											<Button className="btn-sm" variant="secondary">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
