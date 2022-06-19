import styles from "../styles/Header.module.scss";

type Props = {};

const Header = (props: Props) => {
	return (
		<header className={styles.header}>
			<h1>BROCCOLI & CO.</h1>
		</header>
	);
};

export default Header;
