import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>Orders</h1>
			{/* //=-------------------- Orders -------------------- */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					{/* .......... First Row .......... */}
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
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
								{/* .......... USER .......... */}
								<td>{forEachOrder.user && forEachOrder.user.name}</td>
								{/* .......... DATE .......... */}
								<td>{forEachOrder.createdAt.substring(0, 10)}</td>
								{/* .......... TOTAL .......... */}
								<td>${forEachOrder.totalPrice}</td>
								{/* .......... DELIVERED .......... */}
								<td>
									{forEachOrder.isPaid ? (
										forEachOrder.paidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{forEachOrder.isDelivered ? (
										forEachOrder.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: 'red' }}></i>
									)}
								</td>
								{/* .......... DELIVERED .......... */}
								<td>
									<LinkContainer to={`/order/${forEachOrder._id}`}>
										<Button variant="light" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
