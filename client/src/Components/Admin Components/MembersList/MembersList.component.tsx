import { useEffect, useState } from 'react';
import User from '../../../Interfaces/User.interface';
import AdminService from '../../../Services/Admin.service';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RiDeleteBin5Line } from 'react-icons/ri';

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
	const iconSize = 30;
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
		<div>
			<h1 className="primary rounded-t-full pt-7 pb-3 text-center text-white text-2xl">Members List</h1>
			<div className="text-end font-semibold text-green my-2">
				<button onClick={routeChange}>+Add Member</button>
			</div>

			<div className="overflow-y-scroll height-full">
				{members?.map((memberItem) => (
					<div
						className="flex justify-between primary text-white my-4 px-4 py-3 rounded-lg"
						key={memberItem.membershipId}>
						<div>
							<p className="card-name font-sans">Name: {memberItem.name}</p>
							<p className="card-name font-sans">Email: {memberItem.email}</p>
							<p className="card-name font-sans">Phone: {memberItem.phone}</p>
							<p className="card-name font-sans">membership ID: {memberItem.membershipId}</p>
						</div>
						<div className="mt-8">
							<span
								className="delete-icon"
								onClick={handleOpen}>
								<RiDeleteBin5Line
									size={iconSize}
									className="red"
								/>
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
										Please confirm your choice
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
