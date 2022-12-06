// https://firebase.google.com/docs/web/setup#available-libraries
// Optionally import the services that you want to use

// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { initializeApp } from "firebase/app";

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
export { app };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
