export const Login = () => {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// const response = await axios.post()
		} catch (error) {}
	};
	return (
		<div>
			<div>Login</div>
			<form onSubmit={handleSubmit}>
				<input type='email' />
				<input type='password' />
				<button type='submit'>Log in</button>
			</form>
		</div>
	);
};
