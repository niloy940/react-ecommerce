import { getRedirectResult } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { auth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { ButtonContainer, SignInContainer } from './sign-in-form.styles';

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
		await signInWithGooglePopup();
	}

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);

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
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email} />

				<FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password} />

				<ButtonContainer>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInGooglePopup}>Google sign in</Button>
				</ButtonContainer>
			</form>
		</SignInContainer>
	)
}

export default SignInForm;