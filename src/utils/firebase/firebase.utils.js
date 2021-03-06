import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCSqnG1RbKYPHDAIRcNrDGEAW9hI4H2-fo",
	authDomain: "react-ecommercee.firebaseapp.com",
	projectId: "react-ecommercee",
	storageBucket: "react-ecommercee.appspot.com",
	messagingSenderId: "697986228885",
	appId: "1:697986228885:web:10ed83933e2a74f337b19c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth(app);

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(app);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
}

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {})

	return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName, email, createdAt, ...additionalInformation
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);