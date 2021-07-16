import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

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

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// Added < !user || > for user is undefined error (it needs time to fetch user)
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
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
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
