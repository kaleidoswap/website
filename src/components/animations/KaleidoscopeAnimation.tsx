// src/components/animations/KaleidoscopeAnimation.tsx
import React from 'react';

interface KaleidoscopeAnimationProps {
    size?: number;
    className?: string;
}

export const KaleidoscopeAnimation: React.FC<KaleidoscopeAnimationProps> = ({
    size = 600,
    className = ''
}) => {
    const viewBox = "0 0 400 400";
    const center = 200;

    return (
        <svg
            viewBox={viewBox}
            width={size}
            height={size}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Brand color gradients - using KaleidoSwap brand colors */}
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>

                <linearGradient id="secondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfc" />
                    <stop offset="100%" stopColor="#8a5cf6" />
                </linearGradient>

                <linearGradient id="bitcoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7931A" />
                    <stop offset="100%" stopColor="#E87F0A" />
                </linearGradient>

                {/* Animated ring gradients */}
                <linearGradient id="ring1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e">
                        <animate attributeName="stop-color" values="#22c55e;#8a5cf6;#00D4FF;#22c55e" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#16a34a">
                        <animate attributeName="stop-color" values="#16a34a;#7c3aed;#00B8D9;#16a34a" dur="8s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                <linearGradient id="ring2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8a5cf6">
                        <animate attributeName="stop-color" values="#8a5cf6;#00D4FF;#22c55e;#8a5cf6" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#7c3aed">
                        <animate attributeName="stop-color" values="#7c3aed;#00B8D9;#16a34a;#7c3aed" dur="8s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                <linearGradient id="ring3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF">
                        <animate attributeName="stop-color" values="#00D4FF;#22c55e;#8a5cf6;#00D4FF" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#00B8D9">
                        <animate attributeName="stop-color" values="#00B8D9;#16a34a;#7c3aed;#00B8D9" dur="8s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                <linearGradient id="ring4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7931A">
                        <animate attributeName="stop-color" values="#F7931A;#8a5cf6;#22c55e;#F7931A" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#E87F0A">
                        <animate attributeName="stop-color" values="#E87F0A;#7c3aed;#16a34a;#E87F0A" dur="8s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                {/* Glow filters */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#16a34a" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background subtle glow */}
            <circle cx={center} cy={center} r="180" fill="url(#centerGlow)" opacity="0.3">
                <animate attributeName="r" values="170;190;170" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Outer ring - RGB Layer */}
            <g transform={`translate(${center},${center})`}>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="60 0 0"
                    dur="12s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    additive="sum"
                />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${center},${center}`}
                    dur="12s"
                    repeatCount="indefinite"
                    additive="replace"
                />

                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                    <polygon
                        key={`outer-${rotation}`}
                        points="0,-155 45,-135 45,-95 0,-75 -45,-95 -45,-135"
                        fill="url(#ring1Grad)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        opacity="0.85"
                        transform={`rotate(${rotation})`}
                    >
                        <animate attributeName="opacity" values="0.85;0.6;0.85" dur="4s" repeatCount="indefinite" />
                    </polygon>
                ))}
            </g>

            {/* Third ring - Liquid Layer */}
            <g transform={`translate(${center},${center})`}>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="-60 0 0"
                    dur="10s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    additive="sum"
                />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${center},${center}`}
                    dur="10s"
                    repeatCount="indefinite"
                    additive="replace"
                />

                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                    <polygon
                        key={`third-${rotation}`}
                        points="0,-120 35,-100 35,-70 0,-50 -35,-70 -35,-100"
                        fill="url(#ring2Grad)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        opacity="0.85"
                        transform={`rotate(${rotation})`}
                    />
                ))}
            </g>

            {/* Second ring - Spark Layer */}
            <g transform={`translate(${center},${center})`}>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="60 0 0"
                    dur="8s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    additive="sum"
                />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${center},${center}`}
                    dur="8s"
                    repeatCount="indefinite"
                    additive="replace"
                />

                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                    <polygon
                        key={`second-${rotation}`}
                        points="0,-85 25,-70 25,-50 0,-35 -25,-50 -25,-70"
                        fill="url(#ring3Grad)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        opacity="0.85"
                        transform={`rotate(${rotation})`}
                    />
                ))}
            </g>

            {/* Inner ring - Lightning Layer */}
            <g transform={`translate(${center},${center})`}>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="-60 0 0"
                    dur="6s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    additive="sum"
                />
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${center},${center}`}
                    dur="6s"
                    repeatCount="indefinite"
                    additive="replace"
                />

                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                    <polygon
                        key={`inner-${rotation}`}
                        points="0,-55 18,-45 18,-30 0,-20 -18,-30 -18,-45"
                        fill="url(#ring4Grad)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        opacity="0.85"
                        transform={`rotate(${rotation})`}
                    />
                ))}
            </g>

            {/* Protocol icons at cardinal positions */}
            {/* Bitcoin - Top */}
            <g transform={`translate(${center}, 45)`} filter="url(#glow)">
                <circle r="18" fill="url(#bitcoinGrad)" />
                <text x="0" y="6" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">₿</text>
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" />
            </g>

            {/* Lightning - Right */}
            <g transform={`translate(355, ${center})`} filter="url(#glow)">
                <circle r="18" fill="#fbbf24" />
                <path d="M0,-9 L-5,2 L1,2 L-2,11 L5,0 L-1,0 Z" fill="white" />
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" begin="1s" />
            </g>

            {/* RGB - Bottom */}
            <g transform={`translate(${center}, 355)`} filter="url(#glow)">
                <circle r="18" fill="url(#secondaryGrad)" />
                <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">RGB</text>
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" begin="2s" />
            </g>

            {/* Spark - Left */}
            <g transform={`translate(45, ${center})`} filter="url(#glow)">
                <circle r="18" fill="#00D4FF" />
                <g fill="white" transform="scale(0.6)">
                    <polygon points="0,-12 3,0 12,0 5,7 8,18 0,11 -8,18 -5,7 -12,0 -3,0" />
                </g>
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" begin="3s" />
            </g>

            {/* Center - K Logo */}
            <g transform={`translate(${center},${center})`} filter="url(#strongGlow)">
                {/* Core hexagon background */}
                <polygon
                    points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5"
                    fill="url(#primaryGrad)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                />

                {/* K Letter */}
                <g fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="-12" y1="-22" x2="-12" y2="22" />
                    <line x1="-12" y1="0" x2="14" y2="-22" />
                    <line x1="-12" y1="0" x2="14" y2="22" />
                </g>

                {/* Pulse animation */}
                <polygon
                    points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    opacity="0.3"
                >
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="2;6;2" dur="3s" repeatCount="indefinite" />
                </polygon>
            </g>

            {/* Connecting lines */}
            <g stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                <line x1={center} y1="162" x2={center} y2="130">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1={center} y1="238" x2={center} y2="270">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </line>
                <line x1="238" y1={center} x2="270" y2={center}>
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" begin="1s" />
                </line>
                <line x1="162" y1={center} x2="130" y2={center}>
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" begin="1.5s" />
                </line>
            </g>
        </svg>
    );
};

export default KaleidoscopeAnimation;
