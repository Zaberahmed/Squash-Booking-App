import { useEffect, useState } from 'react';
import './MembersList.component.css';
import User from '../../../Interfaces/User.interface';
import AdminService from '../../../Services/Admin.service';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const MembersList = () => {
	const [members, setMembers] = useState<User[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const navigate = useNavigate();
	const path = '/register';
	const routeChange = () => {
		navigate(path);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await AdminService.getMembers();
				console.log(result);
				setMembers(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async (memberId: string) => {
		const result = await AdminService.removeMember({ _id: memberId });
		console.log(result);
		setMembers((prevMembers) => prevMembers.filter((memberItem) => memberItem._id !== memberId));
		handleClose();
	};

	return (
		<div className="container">
			<div className="top-right">
				<button
					className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
					onClick={routeChange}>
					+Add Member
				</button>
			</div>
			<div className="center">
				<h1>Members List</h1>
			</div>
			<div className="cards">
				{members?.map((memberItem) => (
					<div
						className="card bg-gradient-to-r from-cyan-100 to-blue-200"
						key={memberItem.membershipId}>
						<h3 className="card-name font-sans">Name: {memberItem.name}</h3>
						<h3 className="card-name font-sans">Email: {memberItem.email}</h3>
						<h3 className="card-name font-sans">Phone: {memberItem.phone}</h3>
						<h3 className="card-name font-sans">membership ID: {memberItem.membershipId}</h3>
						<div className="card-bottom">
							<span
								className="delete-icon"
								onClick={handleOpen}>
								<svg
									className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 16">
									<path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
								</svg>
							</span>
							<Modal
								open={open}
								onClose={handleClose}
								sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description">
								<Box sx={style}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2">
										Press confirm your choice
									</Typography>
									<Typography
										id="modal-modal-description"
										sx={{ mt: 2 }}>
										<Button
											onClick={() => {
												memberItem._id && handleDelete(memberItem._id);
											}}
											color="error"
											sx={{ float: 'right' }}>
											OKAY
										</Button>
									</Typography>
								</Box>
							</Modal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MembersList;
