import { getAuth, signOut } from "firebase/auth";

const sign_out = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log('signed out')
    }).catch((error) => {
    // An error happened.
    });
}
export default sign_out;