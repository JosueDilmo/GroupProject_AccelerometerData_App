// https://firebase.google.com/docs/web/setup#available-libraries
// Optionally import the services that you want to use

// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7tzuYfIQQEfL7k8I4ZNr92gTjv-6tsNU",
  authDomain: "accelerometerdataapp-3eaed.firebaseapp.com",
  projectId: "accelerometerdataapp-3eaed",
  storageBucket: "accelerometerdataapp-3eaed.appspot.com",
  messagingSenderId: "419580105966",
  appId: "1:419580105966:web:74423ca87de5af68ff8fff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
