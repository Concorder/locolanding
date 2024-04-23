import React, { useEffect, useState } from 'react';
import './styles.css';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', updateCursorPosition);

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition);
        };
    }, []);

    return (
        <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }} />
    );
};

export default CustomCursor;