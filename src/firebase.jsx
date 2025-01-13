// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATTDWYZseQOkMqwSsG0_9mOM9sv0M9Tbc",
  authDomain: "billmanagement-bcac5.firebaseapp.com",
  projectId: "billmanagement-bcac5",
  storageBucket:"billmanagement-bcac5.firebasestorage.app",
  messagingSenderId: "44871667948",
  appId: "1:44871667948:web:57a4f6e7326abbd7dad5c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app is",app)
const storage = getStorage(app);

export { app, storage };
