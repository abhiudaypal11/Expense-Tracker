import React, { useEffect } from "react";
import './style.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import userImg from "../../assests/user.svg";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";



function Header(){
    const [user, loading] = useAuthState(auth);
    const navigate =useNavigate();

useEffect(()=>{
    if (user){
        navigate("/dashboard");
    }
}, [user , loading]);

function logoutFnc(){
    try{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            toast.success("Logged Out Successfully!");
            navigate("/");
          })
           .catch((error) => {
            // An error happened.
            toast.success(error.message);
          });
    }catch(e){
        toast.error(e.message);
    }
    
}

    
    return (
    <div className="navbar">
        <p className="logo">Expense Tracker</p>
        {user && (
            <div style ={{display:"flex" , alignItems: "center", gap :"0.75rem"}}>
                <img
                src={user.photoURL ? user.photoURL : userImg}
               
                style={{borderRadius: "50%",  height:"1.5rem",
                    width:"1.5rem"}}
                />
        <p className="logo link" onClick={logoutFnc}>Logout</p>
        </div>
        )}
    </div>
    );
}
 export default Header;