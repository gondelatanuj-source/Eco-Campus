import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const GridBackground = () => {
    const gridRef = useRef(null);
    const rows = 15;
    const cols = 20;

    useEffect(() => {
        // Initial entrance animation
        animate('.grid-item', {
            scale: [0, 1],
            opacity: [0, 0.3],
            delay: stagger(50, { grid: [cols, rows], from: 'center' }),
            duration: 1000,
            ease: 'outExpo'
        });
    }, []);

    const handleDotHover = (index) => {
        animate('.grid-item', {
            scale: [
                { value: 2, duration: 100 },
                { value: 1, duration: 900 }
            ],
            backgroundColor: [
                { value: 'var(--color-primary)', duration: 100 },
                { value: 'rgba(255, 255, 255, 0.1)', duration: 900 }
            ],
            delay: stagger(50, { grid: [cols, rows], from: index }),
            easing: 'outElastic(1, .6)'
        });
    };

    // simplified grid generation for performance
    const dots = [];
    for (let i = 0; i < rows * cols; i++) {
        dots.push(
            <div
                key={i}
                className="grid-item w-2 h-2 rounded-full bg-white/10 cursor-crosshair"
                onMouseEnter={() => handleDotHover(i)}
            />
        );
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            <div
                ref={gridRef}
                className="grid gap-6 p-4"
                style={{
                    gridTemplateColumns: `repeat(${cols}, min - content)`
                }}
            >
                {dots}
            </div>
            {/* Vignette */}
            <div className="absolute inset-0 bg-background/80 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, var(--color-background) 80%)' }}
            />
        </div>
    );
};

export default GridBackground;
