import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		// If is an admin user => show the list of users
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		}
		// If it is not an admin user => redirect back to /login
		else {
			history.push('/login');
		}

		dispatch(listUsers());
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{/* //=-------------------- Users -------------------- */}
					<Table striped bordered hover responsive className="table-sm">
						{/* .......... First Row .......... */}
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>EMAIL</th>
								<th>ADMIN</th>
								<th></th>
							</tr>
						</thead>
						{/* .......... Body Rows .......... */}
						<tbody>
							{users.map((forEachUser) => (
								<tr key={forEachUser.id}>
									{/* .......... ID .......... */}
									<td>{forEachUser._id}</td>
									{/* .......... NAME .......... */}
									<td>{forEachUser.name}</td>
									{/* .......... EMAIL .......... */}
									<td>
										<a href={`mailto:${forEachUser.email}`}>
											{forEachUser.email}
										</a>
									</td>
									{/* .......... ADMIN .......... */}
									<td>
										{forEachUser.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: 'green' }}></i>
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									{/* .......... EDIT & DELETE .......... */}
									<td>
										<LinkContainer to={`/admin/user/${forEachUser._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(forEachUser._id)}>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default UserListScreen;
