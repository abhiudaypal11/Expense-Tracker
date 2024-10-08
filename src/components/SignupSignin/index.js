import React, { useState } from 'react'
import "./style.css";
import Input from '../input';
import Button from '../Button';
import { createUserWithEmailAndPassword ,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { auth, db, provider } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";


function SignupSigninComponent() {

    const[name , setName]= useState('');
    const[email , setEmail]= useState('');
    const[password , setPassword]= useState('');
    const[confirmPassword , setConfirmPassword]= useState('');
    const[loginForm , setLoginForm] =useState(false);
    const[loading,setLoading] =useState(false);
    const navigate = useNavigate();
    
    

    function signupwithEmail(){
        setLoading(true);
        console.log("Name", name);
        console.log("email",email);
        console.log("password",password);
        console.log("confirmpassword", confirmPassword);

    //authenticate the user , or basically create a new account using email and pass
   if(name!=="" && email!=="" && password!==""&& confirmPassword!=="" ){
    if(password===confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("User>>>",user);
        toast.success('User Created!');
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        createDoc(user);
        navigate("/dashboard")
        // Create A doc user id as the following id
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        // ..
    });
    }else{
        toast.error("password abd Confirm Password don't match!");
        setLoading(false);
    }
    
    
   }else{
    toast.error("All fields are mandatory!");
    setLoading(false);
   }
    
    }
    function loginUSingEmail(){
      console.log('Email',email);
      console.log('Password',password);
      setLoading(true);
      if(email!=="" && password!=="" ){
        signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in 
              const user = userCredential.user;
              toast.success('User Logged In!');
                  console.log('User logged In', user);
                  setLoading(false);
                  navigate("/dashboard");
             // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(errorMessage);
  });
      }else {
        toast.error('All fields are mandatory!');
        setLoading(false);
      }
       
    }
 async function createDoc(user){
  setLoading(true);
    //create a doc
    //make sure that doc with the uid doesn't exist
    if(!user) return;

    const userRef =doc(db,"users", user.uid);
    const userData =await getDoc(userRef);

    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.display : name,
          email,
          photoURL : user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false);
      }
      catch(e){
   toast.error(e.message);
   setLoading(false);
      }
    }else{
      toast.error("Doc already exists");
      setLoading(false);
      
    }
    
    
}
function googleAuth(){
  
  setLoading(true);
  try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('user>>>', user);
      createDoc(user);
      setLoading(false);
      navigate("/dashboard");
      toast.success('User authenticated!');
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      setLoading(false);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.success(errorMessage);
    
    });
  }catch(e){
    setLoading(false);
    toast.error(e.message);
  }
  
};


  return (
  <>
  
   {loginForm ? (
    <div className='signup-wrapper'>
    <h2 className='title'> 
       Login on <span style={{color:'var(--theme)'}}>Expense Tracker.</span>
       </h2>
    <form>
      
       <Input
       type="email"
      label={'Email'}
      state={email}
      setstate={setEmail}
      placeholder={"JohnDoe@gmail.com"}
      />
       <Input
       type="password"
      label={'Password'}
      state={password}
      setstate={setPassword}
      placeholder={"Example@123"}
      />
      
      <Button 
      disabled={loading}
      text={loading ? " Loading...": "Login Using Email and Password"} 
      onclick={loginUSingEmail}
      />
      <p className='p-login' >
        or
        </p> 
      <Button 
      onclick={googleAuth}
      text ={loading ? "Loading...":"Login Using Google"} 
      blue={true}
      />
      <p className='p-login' 
      style={{cursor:"pointer"}}
      onClick={()=> setLoginForm (!loginForm)}>
        Or Don't Have An Account ? Click Here
        </p> 
    </form>
  </div> 
   ):(

    <div className='signup-wrapper'>
      <h2 className='title'> 
         Sign up on <span style={{color:'var(--theme)'}}>Expense Tracker.</span>
         </h2>
      <form>
        <Input
        label={'Full Name'}
        state={name}
        setstate={setName}
        placeholder={"John Doe"}
        />
         <Input
         type="email"
        label={'Email'}
        state={email}
        setstate={setEmail}
        placeholder={"JohnDoe@gmail.com"}
        />
         <Input
         type="password"
        label={'Password'}
        state={password}
        setstate={setPassword}
        placeholder={"Example@123"}
        />
        <Input
        type="password"
        label={'Confirm Password'}
        state={confirmPassword}
        setstate={setConfirmPassword}
        placeholder={"Example@123"}
        />
        <Button 
        disabled={loading}
        text={loading ? " Loading...": "Signup Using Email and Password"} onclick={signupwithEmail}/>
        <p className='p-login' >or</p> 
        <Button 
        
        onclick={googleAuth}
        text ={loading ? "Loading..." : "Signup Using Google"}
         blue={true}
         
         />
        <p className='p-login'
        style={{cursor:"pointer"}}
        onclick={()=>setLoginForm(!loginForm)} >
        Or Have An Account Already? Click Here
        </p> 
      </form>
    </div> 
    
    )}
    </>
   
);
}

export default SignupSigninComponent ;
