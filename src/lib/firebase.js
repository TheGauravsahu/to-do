import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCL4l7cgZWjmPe7RHWsc3MndUVGbRCl7Pk',
	authDomain: 'to-do-dfe05.firebaseapp.com',
	projectId: 'to-do-dfe05',
	storageBucket: 'to-do-dfe05.appspot.com',
	messagingSenderId: '434844389223',
	appId: '1:434844389223:web:271b8fa98f1a93bc9369c2'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const user = writable(null);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			user.set(result.user);
		})
		.catch((error) => {
			console.error('Error during sign-in:', error);
		});
};

export const logout = () => {
	signOut(auth);
};
