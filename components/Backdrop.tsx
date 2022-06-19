import styles from "../styles/Backdrop.module.scss";

type Props = {
	children: React.ReactNode;
};

const Backdrop = (props: Props) => {
	return <div className={styles.backdrop}>{props.children}</div>;
};

export default Backdrop;
