import { useEffect, useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

interface RegisterForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const Register = () => {
	const [formData, setFormData] = useState<RegisterForm>({
		username: '',
		email: '',
		password: 'Test@pass1',
		confirmPassword: ''
	});
	const [error, setError] = useState<Object | null>(null);
	const [passwordError, setPasswordError] = useState<Object | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const validateUsername = (): string | undefined => {
		if (formData.username.length < 3)
			return 'Username must have at least 3 characters';
		return undefined;
	};

	const validateEmail = (): string | undefined => {
		if (!formData.email.includes('@')) return "Email must contain '@'";
		return undefined;
	};

	const validatePassword = (password: string): Object => {
		const requirements = {
			length: password.length >= 8,
			uppercase: /[A-Z]/.test(password),
			digit: /\d/.test(password),
			specialChar: /[!@#$%^&*]/.test(password)
		};
		const isValid = Object.values(requirements).every(Boolean);

		return {
			isValid,
			messages: {
				length: requirements.length ? null : '✗ 8+ characters',
				uppercase: requirements.uppercase ? null : '✗ Uppercase letter',
				digit: requirements.digit ? null : '✗ 1+ number',
				specialChar: requirements.specialChar
					? null
					: '✗ 1+ special character (!@#$%^&*)'
			}
		};
	};

	// const validatePassword = (): String | undefined => {
	// 	if (formData.password.length < 9) {
	// 		setError('Password must be at least 9 characters');
	// 		return undefined;
	// 	}
	// 	if (formData.password.includes('')) {
	// 		return undefined;
	// 	}
	// 	return undefined;
	// };

	const validateConfirmPassword = (): ReactElement | undefined => {
		if (formData.password != formData.confirmPassword)
			return <div>"Passwords don't match"</div>;
		return undefined;
	};

	useEffect(() => {
		setError(validateUsername);
		setError(validateEmail);
		setPasswordError(validatePassword(formData.password));
		console.log(passwordError);
	}, [formData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<div className='register-container'>
			<h1>Create your account!</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						type='username'
						id='username'
						name='username'
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

				<button
					type='submit'
					id='submitBtn'
					name='submitBtn'
					disabled={loading}
				>
					{loading ? 'Creating your account!' : 'Register'}
				</button>
			</form>
			<div className='login-link'>
				Already have an account? <Link to='/login'> Log in Here</Link>
			</div>
		</div>
	);
};
