import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase-config";
import sign_out from "../functions/Google-signout";

export default function AmbulanceDetails() {
  const { id } = useParams();
  const [meldingDetails, setMeldingDetails] = useState(null);

  useEffect(() => {
    const fetchMeldingDetails = async () => {
      const meldingDocRef = doc(db, "meldingen", id);
      const meldingDocSnapshot = await getDoc(meldingDocRef);
      setMeldingDetails(meldingDocSnapshot.data());
    };

    fetchMeldingDetails();
  }, [id]);

  return (
    <div className="ambulance-details">
      <div className="left">
        {meldingDetails && (
          <>
            <h2>{meldingDetails.title}</h2>
            <p>{meldingDetails.beschrijving}</p>
            <p>{meldingDetails.adres}</p>
            <p>{meldingDetails.gegevens}</p>
          </>
        )}
        <button className="loguit" onClick={sign_out}>Log Uit</button>
      </div>
      <div className="right">
      </div>
    </div>
  );
}