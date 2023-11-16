import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase-config";

export default function ZiekenhuisLayout() {
    const auth = getAuth();
    const navigate = useNavigate();

    const authUser = async () => {
        onAuthStateChanged(auth, async (userData) => {
          if (!userData) {
            navigate('/');
          } else if (userData) {
            const q = query(collection(db, "users"), where("uid", "==", userData.uid));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(async (doc) => {
                if (doc.data().rol === "ziekenhuis") {
                navigate('/ziekenhuis');
                } else if (doc.data().rol === "ambulance") {
                navigate('/ambulance');
                }
            });
          }
        });
      };


    useEffect(() => {
        authUser();
    }, [])
    
}