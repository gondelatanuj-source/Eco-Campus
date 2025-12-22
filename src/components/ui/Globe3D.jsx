import React from 'react';

const Globe3D = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">

            {/* Core Sphere */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 preserve-3d animate-float">

                {/* Globe Surface Gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/50 to-accent/20 opacity-20 blur-sm"></div>
                <div className="absolute inset-0 rounded-full border border-primary/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]"></div>

                {/* Longitude Lines (Vertical Rings) */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`long-${i}`}
                        className="absolute inset-0 rounded-full border border-primary/20 preserve-3d"
                        style={{
                            transform: `rotateY(${i * 30}deg)`
                        }}
                    ></div>
                ))}

                {/* Latitude Lines (Horizontal Rings) */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`lat-${i}`}
                        className="absolute left-0 right-0 mx-auto rounded-full border border-primary/20 preserve-3d"
                        style={{
                            top: `${(i + 1) * 16.66}%`,
                            height: `${100 - ((i + 1) * 16.66) * 1.5}%`, // Approximate perspective squish
                            width: '100%',
                            transform: `rotateX(75deg) translateY(${i * 10}px)`
                        }}
                    ></div>
                ))}

                {/* Animated Orbits */}
                <div className="absolute inset-[-20%] rounded-full border border-dashed border-accent/30 animate-spin-slow"></div>
                <div className="absolute inset-[-10%] rounded-full border border-dashed border-primary/30 animate-spin-reverse-slow"></div>

                {/* Floating Particles/Continents mockup */}
                <div className="absolute inset-0 animate-spin-slow opacity-60">
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full blur-[2px]"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-primary rounded-full blur-[4px]"></div>
                    <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-white rounded-full blur-[1px]"></div>
                </div>

            </div>
        </div>
    );
};

export default Globe3D;
