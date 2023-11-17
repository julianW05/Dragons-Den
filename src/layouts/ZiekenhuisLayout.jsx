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
        navigate("/");
      } else if (userData) {
        const q = query(collection(db, "users"), where("uid", "==", userData.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          if (doc.data().rol !== "ziekenhuis") {
            navigate("/");
          }
        });
      }
    });
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <div className="ziekenhuis">
      <header>
        <div className="row">
          <div className="logo">
          <img src="https://media.discordapp.net/attachments/894538357793767474/1174268475204710490/ambulance-logo-free-vector.jpg?ex=6566f9bd&is=655484bd&hm=83480abfb581e42586e720dd9094506c700c05b2eee384b616a1dcc2cd87ed58&=&width=978&height=388" alt="logo" />
          </div>
          
          <div className="cover">
            <div className="meldingen">
              {/* Your "meldingen" box goes here */}
              {/* Example Form */}
              <form >
        <h2 >Melding</h2>

          <label>
            Ongeval:
            <input type="text" placeholder="Ongeval" name="ongeval" />
          </label>
          <br />

          <label>
            Plaats:
            <input type="text" placeholder="Plaats" name="plaats" />
          </label>
          <br />

          <label>
            Ambulance, classificatie:
            <input type="text" placeholder="Ambulance, classificatie" name="ambulanceClassificatie" />
          </label>
          <br />

          <label>
            Situatie:
            <textarea placeholder="Beschrijf de situatie..." name="iets" rows="1"></textarea>
          </label>
          <br />

          <button type="submit">Stuur Melding</button>
        </form>
            </div>
          </div>
        </div>
      </header>

    
      <Outlet />
    </div>
  );
}
