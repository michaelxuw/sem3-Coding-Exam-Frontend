import { InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const InputField = ({
	label,
	name,
	type,
	required,
	value,
	onChange,
	placeholder,
	...props
}: InputFieldProps) => {
	return (
		<div className={"flex flex-col justify-center items-start gap-1 flex-grow"}>
			{label && (
				<label className={"font-medium spacing tracking-wider"} htmlFor={name}>
					{label}
				</label>
			)}
			<input
				className="border-gray-200 border-solid border-[1px] rounded-lg px-3 py-1 w-full"
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				required={required}
				{...props}
			/>
		</div>
	);
};

export default InputField;
