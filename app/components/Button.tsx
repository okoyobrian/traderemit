import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean; // Added disabled property
}

const Button: React.FC<ButtonProps> = ({ href, children, onClick, className, disabled }) => {
    const baseClassName = 'bg-primary text-white rounded-full px-6 py-2 font-semibold tracking-tight h-fit hover:bg-primary-light transition-all duration-200';
    const disabledClassName = '!bg-gray-400 !text-gray-700 cursor-not-allowed';
    const combinedClassName = `${baseClassName} ${className || ''} ${disabled ? disabledClassName : ''}`.trim();

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;