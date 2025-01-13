import React from 'react';

interface FeatureCardProps {
    heading: string;
    body: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ heading, body }) => {
    return (
        <div className="rounded-lg border border-black/20 p-5 px-6 max-w-xs">
            <h2 className="text-xl font-bold mb-2">{heading}</h2>
            <p className='text-secondary-text font-medium'>{body}</p>
        </div>
    );
};

export default FeatureCard;