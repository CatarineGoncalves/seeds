import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  accountType: 'PF' | 'PJ';
  document: string;
};

export async function registerUser(data: RegisterUserData) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, 'users', uid), {
    name: data.name,
    email: data.email,
    accountType: data.accountType,
    document: data.document,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  });

  return userCredential.user;
}

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function getCurrentUserProfile(uid: string) {
  const userDoc = await getDoc(doc(db, 'users', uid));

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data();
}