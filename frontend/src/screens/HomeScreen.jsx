import React, { useState, useEffect } from 'react';
// use to dispatch our actions & use to select the part of state
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
	const dispatch = useDispatch();

	// The state.productList here is one of the reducers from store.js
	const productList = useSelector((state) => state.productList);

	// get potential { loading, products, error} from productList
	const { loading, products, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{/* //=-------------------- Products Image -------------------- */}
			{/* if is loading (loading == true) => show {Loader} */}
			{/* else if there is any error (error != null) => show error {Message} */}
			{/* else (loading finished & no error) => showing our {main page} */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
