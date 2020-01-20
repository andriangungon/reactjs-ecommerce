import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBNJz1Uxt6SZ2z6L1u6RHLdDcGcOfJLfGI",
    authDomain: "ecommerce-b24da.firebaseapp.com",
    databaseURL: "https://ecommerce-b24da.firebaseio.com",
    projectId: "ecommerce-b24da",
    storageBucket: "ecommerce-b24da.appspot.com",
    messagingSenderId: "27599491126",
    appId: "1:27599491126:web:f6e1229feff8b1d56e8897",
    measurementId: "G-JSMT61BMGY"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('Error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;