import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBVPXpGRmRrA-_kz50-ffsz8x4HuYk5SkI",
  authDomain: "docs-clone-ca8af.firebaseapp.com",
  projectId: "docs-clone-ca8af",
  storageBucket: "docs-clone-ca8af.appspot.com",
  messagingSenderId: "145971895542",
  appId: "1:145971895542:web:dceec78dc0a2940177a0d7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
