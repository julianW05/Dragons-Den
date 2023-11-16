import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {db, analytics, provider} from '../Firebase-config'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sign_in = async() => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
    });
}
export default sign_in;