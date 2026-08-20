import React, { useEffect, useState } from 'react';
import './styles.css';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const syncEnabled = () => setEnabled(finePointer.matches);
        syncEnabled();
        finePointer.addEventListener("change", syncEnabled);

        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener("mousemove", updateCursorPosition);

        return () => {
            finePointer.removeEventListener("change", syncEnabled);
            document.removeEventListener("mousemove", updateCursorPosition);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }} />
    );
};

export default CustomCursor;