import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'

function Home() {
   const { state, dispatch } = useContext(Store);
   const {
     user
   } = state;

   const navigate = useNavigate();

   const handleLogOut = (event) => {
     event.preventDefault();
     dispatch({ type: "USER_SIGNOUT" });
     //remove user info from user storage
     localStorage.removeItem("user");
     navigate('/');
   };

   useEffect(() =>{
    const userInfo = localStorage.getItem('user');
    if(!userInfo){
      navigate('/')
    }
   }, [user])

  return (
    <div>
      <button onClick={handleLogOut}>Sign out</button>
    </div>
  );
}

export default Home