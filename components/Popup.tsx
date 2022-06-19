import { useEffect, useState } from "react";
import styles from "../styles/Popup.module.scss";
import Backdrop from "./Backdrop";
import { PopupProps } from "../types/popup";

type Status = "default" | "loading" | "success" | "error";

const Popup = ({ show, setShow, content }: PopupProps) => {
	const [status, setStatus] = useState<Status>("default");
	const [displayedContent, setDisplayedContent] = useState({
		title: "",
		buttonText: "",
		successMessage: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");
		setTimeout(() => {
			if (status === "loading") {
				setStatus("error");
				setErrorMessage(
					"Submission timed out, please try again later.",
				);
			}
		}, 10000);

		// Email mismatch error
		if (
			e.currentTarget.email.value !== e.currentTarget.confirmEmail.value
		) {
			setStatus("error");
			setErrorMessage("Email mismatch");
			console.error("email mismatch");
		} else {
			fetch(
				"https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: e.currentTarget.name.value,
						email: e.currentTarget.email.value,
					}),
				},
			)
				.then((res) => {
					if (res.status === 200) {
						console.log("success");
						setStatus("success");
					} else if (res.status === 400) {
						setStatus("error");
						console.log(res);
						if (res.statusText) {
							setErrorMessage(res.statusText);
						} else {
							setErrorMessage(
								"Something went wrong, please try again.",
							);
						}
					}
				})
				.catch((err) => {
					setStatus("error");
					setErrorMessage(err.message);
					console.log(err);
				});
		}
	};

	// Update displayed content depending on status
	useEffect(() => {
		status === "default"
			? setDisplayedContent({
					title: content.title,
					buttonText: content.buttonDefaultText,
					successMessage: "",
			  })
			: status === "loading"
			? setDisplayedContent({
					title: content.title,
					buttonText: content.buttonLoadingText,
					successMessage: content.successMessage,
			  })
			: status === "success"
			? setDisplayedContent({
					title: content.successTitle,
					buttonText: content.buttonSuccessText,
					successMessage: content.successMessage,
			  })
			: status === "error"
			? setDisplayedContent({
					title: content.title,
					buttonText: content.buttonDefaultText,
					successMessage: "",
			  })
			: setDisplayedContent({
					title: content.title,
					buttonText: content.buttonDefaultText,
					successMessage: "",
			  });
	}, [status, content]);

	return (
		<>
			<Backdrop>
				<div className={styles.popup}>
					<div className={styles.popupHeader}>
						<h3>{displayedContent.title}</h3>
						<div className={styles.divider}></div>
					</div>
					{status === "success" ? (
						<>
							<p>{displayedContent.successMessage}</p>
							<button onClick={() => setShow(false)}>
								{displayedContent.buttonText}
							</button>
						</>
					) : (
						<form onSubmit={handleSubmit}>
							<input
								placeholder="Full name"
								type="text"
								id="name"
								name="name"
								required
							/>
							<input
								placeholder="Email"
								type="email"
								id="email"
								name="email"
								required
							/>
							<input
								placeholder="Confirm email"
								type="email"
								id="confirmEmail"
								name="confirmEmail"
								required
							/>
							<input
								type="submit"
								value={displayedContent.buttonText}
								disabled={status === "loading"}
							/>
						</form>
					)}
					{status === "error" ? (
						<p className={styles.errorMessage}>{errorMessage}</p>
					) : null}
				</div>
			</Backdrop>
		</>
	);
};

export default Popup;
