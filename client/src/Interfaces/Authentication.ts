export default interface Authentication {
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}
