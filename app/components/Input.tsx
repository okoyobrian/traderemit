import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    setText?: (text: string) => void;
    label?: string;
    className?: string;
    rounded?: boolean;
}

export default function Input({ text, setText, label, className, rounded, ...props }: InputProps) {
    const input = (
        <input
            value={text}
            onChange={(e) => setText && setText(e.target.value)}
            {...props}
            className={
                "mb-4 mr-3 p-2 px-4 border border-gray-300 rounded-md " +
                (rounded ? "!rounded-full px-5 " : "") +
                className
            }
        />
    );
    return (
        <>
            {label ? (
                <label className="block mb-2 mt-3">
                    <div className="font-medium text-md tracking-tight mb-1 text-secondary-text w-fit">
                        {label}
                    </div>
                    {input}
                </label>
            ) : input}
        </>
    );
}