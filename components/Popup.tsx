import styles from "../styles/Popup.module.scss";
import Backdrop from "./Backdrop";

type Props = {};

const Popup = (props: Props) => {
	return (
		<>
			<Backdrop>
				<div className={styles.popup}>
					<div className={styles.popupHeader}>
						<h3>Request an invite</h3>
						<div className={styles.divider}></div>
					</div>
					<form action="">
						<input placeholder="Full name" type="text" id="name" />
						<input placeholder="Email" type="email" id="email" />
						<input
							placeholder="Confirm email"
							type="email"
							id="confirm-email"
						/>
						<input type="submit" value="Send" />
					</form>
				</div>
			</Backdrop>
		</>
	);
};

export default Popup;
