import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase-config";

export default function AmbulanceLayout() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [meldingen, setMeldingen] = useState([]);

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
                navigate('/ambulance/null');
                }
            });
          }
        });
      };

    const getMeldingen = async () => {
        const q = query(collection(db, "meldingen"));
        const querySnapshot = await getDocs(q);

        setMeldingen(prevMeldingen => [
            ...prevMeldingen,
            ...querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ]);
    }

    useEffect(() => {
        authUser();
        getMeldingen();
    }, [])

    useEffect(() => {
        if (meldingen[0]) {
            navigate('/ambulance/' + meldingen[0].id);
        }
    } , [meldingen])

    return (
        <div className="ambulance">
            <header>
                <div className="row">
                    <div className="logo col-md-3">
                        <img src="https://media.discordapp.net/attachments/894538357793767474/1174268475204710490/ambulance-logo-free-vector.jpg?ex=6566f9bd&is=655484bd&hm=83480abfb581e42586e720dd9094506c700c05b2eee384b616a1dcc2cd87ed58&=&width=978&height=388" alt="logo" />
                    </div>
                    <div className="cover col-md-9">                     
                        <div className="meldingen">
                            {meldingen.map((melding, index) => (
                                <NavLink key={melding.id} to={melding.id}>
                                    <div className="melding" key={index}>
                                        <h5>{melding.title}</h5>
                                        <p>{melding.adres}</p>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}