import { getRedirectResult } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { auth, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// useEffect(() => {
	// 	redirectResult();
	// }, [])

	// const redirectResult = async () => {
	// 	const response = await getRedirectResult(auth);
	// 	console.log(response);
	// 	if (response) {
	// 		const userDocRef = await createUserDocumentFromAuth(response.user);
	// 	}
	// }

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const signInGooglePopup = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incurrect password for email!');
					break;

				case 'auth/user-not-found':
					alert('no user associated with this email!');
					break;

				default:
					console.log(error);
					break;
			}

		}
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email} />

				<FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password} />

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInGooglePopup}>Google sign in</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm;