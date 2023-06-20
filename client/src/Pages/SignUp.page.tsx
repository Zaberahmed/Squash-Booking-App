import Register from '../Components/Register/Register.component';

interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}
const SignUpPage = (props: Props) => {
	return (
		<Register
			setIsAuthenticated={props.setIsAuthenticated}
			isAuthenticated={props.isAuthenticated}
		/>
	);
};

export default SignUpPage;
