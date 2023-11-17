import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {db, analytics, provider} from '../Firebase-config'
import { useEffect, useState } from 'react'
import sign_in from '../functions/Google-signin'
import sign_out from '../functions/Google-signout'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function LoginLayout() {
  const auth = getAuth();
  const navigate = useNavigate();

  const authUser = async () => {
    onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        const q = query(collection(db, "users"), where("uid", "==", userData.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const docRef = await addDoc(collection(db, "users"), {
            uid: userData.uid,
            rol: "ziekenhuis",
            isadmin: false
          });
          navigate('/ziekenhuis');
        } else {
          querySnapshot.forEach(async (doc) => {
            if (doc.data().rol === "ziekenhuis") {
              navigate('/ziekenhuis');
            } else if (doc.data().rol === "ambulance") {
              navigate('/ambulance');
            }
          });
        }
        console.log(userData);
      }});
  }

  useEffect(() => {
    authUser();
  }, [])

  return (
    <div className="login row">
      <div className="background-image">
        <img src="https://media.discordapp.net/attachments/894538357793767474/1174264146137714739/image.png?ex=6566f5b5&is=655480b5&hm=c50c3aede1a28b925db2c94dfc47932af6dd4adc4e728549bc5c83f4124d653b&=&width=1051&height=662" alt="map" />
      </div>
      <div className="left col-md-6">
      </div>
      <div className="right col-md-6">
        <img className="logo" src="https://media.discordapp.net/attachments/894538357793767474/1174268475204710490/ambulance-logo-free-vector.jpg?ex=6566f9bd&is=655484bd&hm=83480abfb581e42586e720dd9094506c700c05b2eee384b616a1dcc2cd87ed58&=&width=978&height=388" alt="logo" />
        <div className="title">
          <h5>Welkom bij Dragons Den</h5>
          <p>Log in met uw medisch account</p>
        </div>
        <div className="login-button col-md-5">
            <button className="col-md-12" onClick={sign_in}>Log in</button>
        </div>
      </div>
          <Outlet />
    </div>
  )
}