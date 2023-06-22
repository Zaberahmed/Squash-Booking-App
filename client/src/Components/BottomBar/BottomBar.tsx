import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineUpcoming } from 'react-icons/md';
import { GoHistory } from 'react-icons/go';
import { Link } from 'react-router-dom';

const BottomBar: React.FC = () => {
	const iconSize = 30;
	return (
		<div className="flex justify-center items-center fixed bottom-16 left-0 right-0 gap-16">
			<Link to="/profile">
				<CgProfile size={iconSize} />
			</Link>
			<Link to="/history">
				<GoHistory size={iconSize} />
			</Link>
			<Link to="/upcoming">
				<MdOutlineUpcoming size={iconSize} />
			</Link>
		</div>
	);
};

export default BottomBar;
