import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LottiePlayer() {
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
			<Player
				autoplay={true}
				loop={false}
				src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
				style={{ height: '300px', width: '300px' }}
				onEvent={handleLoopComplete}>
				<Controls
					visible={true}
					buttons={['play', 'repeat', 'frame', 'debug']}
				/>
			</Player>
		</>
	);
}
