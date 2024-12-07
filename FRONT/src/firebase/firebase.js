// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Firebase Authentication を使用する場合
import { getAnalytics } from "firebase/analytics"; // Analytics を使用する場合

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDOuvruNhH2EApbZpbDfZhunYcTrRdsmOo",
authDomain: "presentsai-86eed.firebaseapp.com",
databaseURL: "https://presentsai-86eed-default-rtdb.firebaseio.com",
projectId: "presentsai-86eed",
storageBucket: "presentsai-86eed.appspot.com", // 修正: ストレージURLに "appspot.com" を使用
messagingSenderId: "813198408176",
appId: "1:813198408176:web:74191e22c583ab82cb4535",
measurementId: "G-S97CY8PWE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in your app
const database = getDatabase(app); // Realtime Database のインスタンス
const auth = getAuth(app); // Authentication のインスタンス
const analytics = getAnalytics(app); // Analytics のインスタンス（オプション）

export { app, database, auth, analytics };
