import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {firebase} from './firebase'
import {useState, useEffect} from "react";
import {child, get, orderByChild, ref, set, remove} from "firebase/database";
import {db} from "./firebase";

export const signInWithGoogle = async () => {
    return await signInWithPopup(getAuth(firebase), new GoogleAuthProvider()).then(
        (result) => {
            return [result.user.email, result.user.displayName, result.user.photoURL];
        }
    )
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = ({setUEmail, setUName, setUid}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const auth = getAuth(firebase);
        onIdTokenChanged(auth, setUser);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUEmail(user.email)
                setUName(user.displayName)
                setUid(user.uid)
            }
        })
    }, []);

    return [user];
};

export function make_user(UName, UEmail){
            const user= UEmail.replaceAll(".", "_");
            set(ref(db, 'users/' + user), {
                username: UName,
                user_email: UEmail,
            }).then(() => {
                alert("user success!")
            }).catch((error) => {
                console.log(error);
            });  
}

