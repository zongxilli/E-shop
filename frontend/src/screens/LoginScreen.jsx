import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	// REDUCER: userLogin <- store.js <- userLogin Reducer
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		// ACTION: login <- login Action
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
		<Meta title={'Sign In'} />
			<h1>Sign In</h1>
			{/* If error exists => show error message */}
			{error && <Message variant="danger">{error}</Message>}

			{/* If loading => show Loader */}
			{loading && <Loader />}

			{/* //=-------------------- Sign In Form -------------------- */}
			<Form onSubmit={submitHandler}>
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

				{/* .......... Sign In Button .......... */}
				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>
			{/* .......... Register Link  .......... */}
			<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
