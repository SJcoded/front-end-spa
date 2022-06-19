import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Popup from "../components/Popup";
import styles from "../styles/Home.module.scss";
import { PopupContent } from "../types/popup";

const popupContent: PopupContent = {
	title: "Request an invite",
	successTitle: "All set!",
	successMessage:
		"You will be the first to experience Broccoli & Co. when we launch.",
	buttonDefaultText: "Send",
	buttonLoadingText: "Sending, please wait...",
	buttonSuccessText: "OK",
};

const Home: NextPage = () => {
	const [showPopup, setShowPopup] = useState(false);

	const handleClick = () => {
		setShowPopup(true);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Broccoli & Co.</title>
				<meta
					name="description"
					content="The most delicious broccoli in the world"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			<main className={styles.main}>
				<div className={styles.hero}>
					<h1>
						A better way <br />
						to enjoy every day.
					</h1>
					<p>Be the first to know when we launch</p>
					<button onClick={handleClick}>Request an invite</button>
				</div>
			</main>
			{showPopup && (
				<Popup
					show={showPopup}
					setShow={setShowPopup}
					content={popupContent}
				/>
			)}

			<Footer />
		</div>
	);
};

export default Home;
