import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Meta from '../components/Meta';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	// REDUCER: userRegister <- store.js <- userRegister Reducer
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		// Password does not match ConfirmPassword
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			// ACTION: Register <- Register Action
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<Meta title={'Sign Up'} />
			<h1>Sign Up</h1>

			{/* If message exists => show message */}
			{message && <Message variant="danger">{message}</Message>}

			{/* If error exists => show error message */}
			{error && <Message variant="danger">{error}</Message>}

			{/* If loading => show Loader */}
			{loading && <Loader />}

			{/* //=-------------------- Sign Up Form -------------------- */}
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
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				{/* .......... Register Button .......... */}
				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>
			{/* .......... Register Link  .......... */}
			<Row className="py-3">
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Log in
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
