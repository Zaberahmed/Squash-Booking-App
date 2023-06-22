import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LottiePlayer(): any {
	const [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();

	const handleLoopComplete = (e: string) => {
		if (e === 'loop') setRedirect(true);
	};
	if (redirect) {
		return navigate('/landing');
	}

	return (
		<>
			{
				<Player
					autoplay={true}
					loop={true}
					src="https://assets10.lottiefiles.com/private_files/lf30_y3iokxv5.json"
					style={{ height: '300px', width: '300px' ,marginTop:'200px',color:'yellow'}}
					onEvent={handleLoopComplete}>
					<Controls
						visible={false}
						buttons={['play', 'repeat', 'frame', 'debug']}
					/>
				</Player>
			}
		</>
	);
}

export default LottiePlayer;
