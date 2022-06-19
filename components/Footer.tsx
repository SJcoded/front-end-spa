import styles from "../styles/Footer.module.scss";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
	return (
		<footer className={styles.footer}>
			Made with ♥ in Melbourne.
			<br /> @ 2016 Broccoli & Co. All rights reserved.
		</footer>
	);
};

export default Footer;
