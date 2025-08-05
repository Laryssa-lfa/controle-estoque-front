import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "controle-estoque.firebaseapp.com",
  projectId: "controle-estoque-",
  storageBucket: "controle-estoque.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: ""
};

const app = initializeApp(firebaseConfig);

export default app;
