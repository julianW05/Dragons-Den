import { Outlet, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../Firebase-config';
import { useEffect, useState } from 'react';
import sign_in from '../functions/Google-signin';

export default function LoginLayout() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

const authUser = () => {
  return onAuthStateChanged(auth, async (userData) => {
    setLoading(true);
    try {
      if (userData) {
        const q = query(collection(db, 'users'), where('uid', '==', userData.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const docRef = await addDoc(collection(db, 'users'), {
            uid: userData.uid,
            rol: null, 
            isadmin: false,
          });
        } else {
          querySnapshot.forEach(async (doc) => {
            const role = doc.data().rol;
            setUserRole(role);
          });
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  });
};


  const handleRoleSelection = async (selectedRole) => {
    try {
      if (userRole === null) {
        const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await doc.ref.update({ rol: selectedRole });
          });
        }
      }

      setUserRole(selectedRole);

      switch (selectedRole) {
        case 'ziekenhuis':
          navigate('/ziekenhuis');
          break;
        case 'ambulance':
          navigate('/ambulance');
          break;
        default:
          break;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = authUser();
    return () => unsubscribe();
  }, []);

  return (
    <div className="login row">
      <div className="background-image">
        <img src="https://media.discordapp.net/attachments/894538357793767474/1174264146137714739/image.png?ex=6566f5b5&is=655480b5&hm=c50c3aede1a28b925db2c94dfc47932af6dd4adc4e728549bc5c83f4124d653b&=&width=1051&height=662" alt="map" />
      </div>
      <div className="left col-md-6"></div>
      <div className="right col-md-6">
        <img className="logo" src="https://media.discordapp.net/attachments/894538357793767474/1174268475204710490/ambulance-logo-free-vector.jpg?ex=6566f9bd&is=655484bd&hm=83480abfb581e42586e720dd9094506c700c05b2eee384b616a1dcc2cd87ed58&=&width=978&height=388" alt="logo" />
        <div className="title">
          <h5>Welkom bij Dragons Den</h5>
          <p>Log in met uw medisch account</p>
        </div>
        <div className="login-button col-md-5">
          <button className="col-md-12" onClick={sign_in}>
            Log in
          </button>
        </div>
        {userRole === null && (
          <div className="role-selection">
            <button onClick={() => handleRoleSelection('ziekenhuis')}>Ziekenhuis medewerker</button>
            <button onClick={() => handleRoleSelection('ambulance')}>Ambulance bestuurder</button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
