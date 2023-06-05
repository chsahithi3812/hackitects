import styles from "./styles.module.css";

function Home() {
	const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;