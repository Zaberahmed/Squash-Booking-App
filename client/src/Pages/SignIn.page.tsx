import Login from '../Components/Login/Login.component';
interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}
const SignInPage = (props: Props) => {
	return (
		<Login
			setIsAuthenticated={props.setIsAuthenticated}
			isAuthenticated={props.isAuthenticated}
		/>
	);
};

export default SignInPage;
