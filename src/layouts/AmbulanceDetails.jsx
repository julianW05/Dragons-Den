import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase-config";

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
      </div>
      <div className="right">
      </div>
    </div>
  );
}