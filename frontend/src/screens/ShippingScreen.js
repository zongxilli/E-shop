import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ({ history }) => {
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			{/* //=-------------------- Shipping Form -------------------- */}
			<Form onSubmit={submitHandler}>
				{/* .......... Address .......... */}
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}></Form.Control>
				</Form.Group>

				{/* .......... City .......... */}
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}></Form.Control>
				</Form.Group>

				{/* .......... PostalCode .......... */}
				<Form.Group controlId="postalCode">
					<Form.Label>PostalCode</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postalCode"
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
				</Form.Group>

				{/* .......... Country .......... */}
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
