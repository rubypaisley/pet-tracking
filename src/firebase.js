import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBKub1nQI4B7MFhe3gWNZaQ9i6RTeGLzi0",
    authDomain: "pet-behavior-tracker.firebaseapp.com",
    databaseURL: "https://pet-behavior-tracker.firebaseio.com",
    projectId: "pet-behavior-tracker",
    storageBucket: "pet-behavior-tracker.appspot.com",
    messagingSenderId: "147849810513",
    appId: "1:147849810513:web:86ea414437826487"
};

firebase.initializeApp(config);
export default firebase;
