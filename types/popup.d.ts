import { Dispatch, SetStateAction } from "react";

type PopupProps = {
	show: boolean;
	setShow: Dispatch<SetStateAction<State>>;
	content: PopupContent;
};

type PopupContent = {
	title: string;
	successTitle: string;
	successMessage: string;
	buttonDefaultText: string;
	buttonSuccessText: string;
	buttonLoadingText: string;
};
