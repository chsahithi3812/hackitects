import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import {signInWithPopup} from "firebase/auth";
import {auth,provider} from "../googleSignIn/config";
import React, { useEffect, useState ,useContext, useRef} from "react";
import Home from "../Home/index";
import axios from "axios";
import { Context } from "../../context/Contex";


function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  dispatch({ type: "LOGIN_START" });
	  try {
		const res = await axios.post("/login", {
		  email: userRef.current.value,
		  password: passwordRef.current.value,
		});
		console.log(res.data.token)
		localStorage.setItem("jwt", res.data.token);
		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
	  } catch (err) {
		dispatch({ type: "LOGIN_FAILURE" });
	  }
	};
	const [value,setValue] = useState('')
	const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }
	useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
	
	return ( 
		<div>
		  {value?<Home/>:
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input type="text" className={styles.input} placeholder="Email"    ref={userRef} />
					<input type="password" className={styles.input} placeholder="Password"   ref={passwordRef}/>
					<button className={styles.btn} disabled={isFetching} onClick={handleSubmit}>Log In</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={handleClick}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
		</div>
		  }
		</div>
	);
}

export default Login;