import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState,useMemo } from "react";
import axios from "axios";
import Orb from "../../Components/Orb/Orb";

function Signup() {
	const [name, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const handleSubmit =  async() => {
	//   e.preventDefault();
	setError(false);
	  console.log("hi")
	   try {
		const res = await axios.post("/signup", {
		  name,
		  email,
		  password,
		});
		console.log(res);
		res.data && window.location.replace("/login");
	  } catch (err) {
		setError(true);
	  }
 
	};

	
	const orbMemo = useMemo(() => {
		return <Orb />;
	  }, []);

	return (
		<div className={styles.container}>
			{orbMemo}
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input type="text" className={styles.input} placeholder="Username"  onChange={(e) => setUsername(e.target.value)} />
					<input type="text" className={styles.input} placeholder="Email"
					 onChange={(e) => setEmail(e.target.value)} />
					<input 
						type="password"
						className={styles.input}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className={styles.btn} onClick={handleSubmit}>Sign Up</button>
					<p className={styles.text}>or</p>
					
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div> 
			</div>
		</div>
	);
}

export default Signup;