import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	outline?: boolean;
}

const Button = ({ type, onClick, children, className, outline }: ButtonProps) => {
	return (
		<button
			className={`${className} flex-grow m-0 w-full px-5 py-1 rounded-lg ${
				outline ? "border-2 border-blue-400 text-blue-400" : "bg-blue-400 text-white"
			} active:scale-95 hover:scale-105 transition-all`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
