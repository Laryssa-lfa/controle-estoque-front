import app from "./app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

async function firebaseSignup(email, senha) {
  await createUserWithEmailAndPassword(auth, email, senha);
}

async function firebaseLogin(email, senha) {
  await signInWithEmailAndPassword(auth, email, senha);
}

async function firebaseLogout() {
  await signOut(auth);
}

function firebaseUser() {
  return auth.currentUser;
}

async function firebaseUserToken() {
  const user = firebaseUser();
  return await user?.getIdToken();
}

function firebaseObserveUser(handleChange) {
  return onIdTokenChanged(auth, (user) => {
    handleChange(user);
  });
}

export {
  firebaseSignup,
  firebaseLogin,
  firebaseLogout,
  firebaseUser,
  firebaseUserToken,
  firebaseObserveUser,
};
