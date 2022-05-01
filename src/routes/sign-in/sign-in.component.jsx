import { getRedirectResult } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
	useEffect(() => {
		redirectResult();
	}, [])

	const redirectResult = async () => {
		const response = await getRedirectResult(auth);
		console.log(response);
		if (response) {
			const userDocRef = await createUserDocumentFromAuth(response.user);
		}
	}

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<div>
			<div>SignIn</div>
			<button onClick={logGoogleUser}>Sign in with google popup</button>
			<button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>

			<SignUpForm />
		</div>
	)
}

export default SignIn;