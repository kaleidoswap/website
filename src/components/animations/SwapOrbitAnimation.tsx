// src/components/animations/SwapOrbitAnimation.tsx
import React from 'react';

interface SwapOrbitAnimationProps {
    size?: number;
    className?: string;
}

export const SwapOrbitAnimation: React.FC<SwapOrbitAnimationProps> = ({
    size = 600,
    className = ''
}) => {
    const viewBox = `0 0 ${size} ${size}`;
    const center = size / 2;

    // Orbit radii for different rings
    const innerOrbit = size * 0.28;
    const outerOrbit = size * 0.42;

    // Icon size relative to main size
    const iconSize = size * 0.08;
    const logoSize = size * 0.22;

    return (
        <svg
            viewBox={viewBox}
            width={size}
            height={size}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="kaleido-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#15E99A" />
                    <stop offset="50%" stopColor="#17B581" />
                    <stop offset="100%" stopColor="#6F32FF" />
                </linearGradient>

                <linearGradient id="swap-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#15E99A" stopOpacity="0" />
                    <stop offset="50%" stopColor="#15E99A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6F32FF" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="rgb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEF00" />
                    <stop offset="50%" stopColor="#1BEB39" />
                    <stop offset="100%" stopColor="#16E4DD" />
                </linearGradient>

                <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14909c" />
                    <stop offset="100%" stopColor="#22e1c9" />
                </linearGradient>

                {/* Glow filters */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="icon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Particle gradient */}
                <radialGradient id="particle-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#15E99A" stopOpacity="1" />
                    <stop offset="100%" stopColor="#15E99A" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background glow */}
            <circle cx={center} cy={center} r={size * 0.35} fill="url(#kaleido-gradient)" opacity="0.05">
                <animate attributeName="r" values={`${size * 0.32};${size * 0.38};${size * 0.32}`} dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.03;0.08;0.03" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Orbit rings */}
            <circle
                cx={center}
                cy={center}
                r={innerOrbit}
                fill="none"
                stroke="url(#kaleido-gradient)"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="8 4"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="24" dur="10s" repeatCount="indefinite" />
            </circle>

            <circle
                cx={center}
                cy={center}
                r={outerOrbit}
                fill="none"
                stroke="url(#kaleido-gradient)"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="12 6"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="15s" repeatCount="indefinite" />
            </circle>

            {/* Swap lines connecting icons */}
            <g opacity="0.6" filter="url(#glow)">
                {/* Dynamic swap connection lines */}
                <line x1={center - innerOrbit} y1={center} x2={center + innerOrbit} y2={center} stroke="url(#swap-line-gradient)" strokeWidth="2">
                    <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1={center} y1={center - innerOrbit} x2={center} y2={center + innerOrbit} stroke="url(#swap-line-gradient)" strokeWidth="2">
                    <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                </line>
            </g>

            {/* Floating particles representing transactions */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle key={`particle-${i}`} r="3" fill="url(#particle-gradient)" filter="url(#icon-glow)">
                    <animateMotion
                        dur={`${4 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={`M${center},${center} m${innerOrbit * Math.cos(angle * Math.PI / 180)},${innerOrbit * Math.sin(angle * Math.PI / 180)} a${innerOrbit},${innerOrbit} 0 1,1 0,1`}
                    />
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
            ))}

            {/* === ORBITING ICONS === */}

            {/* Inner orbit icons: BTC, LN, RGB */}

            {/* Bitcoin - Inner orbit */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${center} ${center}`}
                    to={`360 ${center} ${center}`}
                    dur="20s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + innerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`-360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="20s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* Bitcoin icon */}
                    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} fill="#f7931a" />
                    <path
                        transform={`translate(${iconSize * 0.2}, ${iconSize * 0.15}) scale(${iconSize / 45})`}
                        fill="#FFF"
                        d="m23.189,13.86c0.319-2.132-1.304-3.278-3.523-4.042l0.72-2.888-1.757-0.438-0.701,2.811c-0.462-0.115-0.937-0.224-1.408-0.331l0.706-2.83-1.757-0.438-0.72,2.887c-0.383-0.087-0.758-0.173-1.122-0.264l0.002-0.009-2.424-0.605-0.468,1.877s1.304,0.299,1.276,0.317c0.712,0.178,0.84,0.649,0.819,1.022l-0.82,3.289c0.049,0.012,0.113,0.031,0.183,0.059-0.059-0.015-0.121-0.03-0.186-0.046l-1.149,4.608c-0.087,0.216-0.308,0.54-0.805,0.417,0.018,0.026-1.277-0.319-1.277-0.319l-0.872,2.012,2.287,0.57c0.425,0.107,0.842,0.218,1.253,0.323l-0.727,2.92,1.755,0.438,0.72-2.889c0.48,0.13,0.945,0.25,1.401,0.363l-0.717,2.876,1.757,0.438,0.727-2.916c2.998,0.567,5.252,0.338,6.201-2.373,0.765-2.183-0.038-3.442-1.615-4.263,1.148-0.265,2.013-1.02,2.244-2.58zm-4.016,5.632c-0.543,2.183-4.218,1.003-5.41,0.707l0.965-3.869c1.192,0.297,5.012,0.886,4.445,3.162zm0.543-5.664c-0.495,1.985-3.555,0.977-4.547,0.729l0.875-3.51c0.992,0.247,4.188,0.709,3.672,2.781z"
                    />
                </g>
            </g>

            {/* Lightning - Inner orbit (120 degrees offset) */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`120 ${center} ${center}`}
                    to={`480 ${center} ${center}`}
                    dur="20s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + innerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`-360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="20s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* Lightning bolt icon */}
                    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} fill="#792DE4" />
                    <path
                        transform={`translate(${iconSize * 0.25}, ${iconSize * 0.15}) scale(${iconSize / 55})`}
                        fill="#FFD700"
                        d="M23 0L9 20h8L13 35l14-20h-8L23 0z"
                    />
                </g>
            </g>

            {/* RGB - Inner orbit (240 degrees offset) */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`240 ${center} ${center}`}
                    to={`600 ${center} ${center}`}
                    dur="20s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + innerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`-360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="20s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* RGB simplified triangle icon */}
                    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} fill="#1a1a2e" />
                    <path
                        transform={`translate(${iconSize * 0.2}, ${iconSize * 0.18}) scale(${iconSize / 60})`}
                        fill="url(#rgb-gradient)"
                        d="M20 0L0 35h40L20 0zM20 10l12 20H8l12-20z"
                    />
                </g>
            </g>

            {/* Outer orbit icons: Spark, Arkade, Liquid */}

            {/* Spark - Outer orbit */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`30 ${center} ${center}`}
                    to={`-330 ${center} ${center}`}
                    dur="30s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + outerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="30s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* Spark asterisk icon */}
                    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} fill="#FF5722" />
                    <g transform={`translate(${iconSize * 0.18}, ${iconSize * 0.18}) scale(${iconSize / 50})`}>
                        <path fill="#FFF" d="M16 0l1.5 13.5L16 28l-1.5-14.5L16 0z" />
                        <path fill="#FFF" d="M16 0l1.5 13.5L16 28l-1.5-14.5L16 0z" transform="rotate(60 16 14)" />
                        <path fill="#FFF" d="M16 0l1.5 13.5L16 28l-1.5-14.5L16 0z" transform="rotate(120 16 14)" />
                    </g>
                </g>
            </g>

            {/* Arkade - Outer orbit (120 degrees offset) */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`150 ${center} ${center}`}
                    to={`-210 ${center} ${center}`}
                    dur="30s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + outerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="30s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* Arkade pixel A icon */}
                    <rect x="0" y="0" width={iconSize} height={iconSize} rx={iconSize * 0.15} fill="#351791" />
                    <g transform={`translate(${iconSize * 0.2}, ${iconSize * 0.22}) scale(${iconSize / 55})`}>
                        <rect x="12" y="0" width="8" height="8" fill="#F6F6F6" />
                        <rect x="4" y="0" width="8" height="8" fill="#F6F6F6" />
                        <rect x="20" y="8" width="8" height="8" fill="#F6F6F6" />
                        <rect x="0" y="8" width="8" height="8" fill="#F6F6F6" />
                        <rect x="4" y="16" width="8" height="8" fill="#F6F6F6" />
                        <rect x="12" y="16" width="8" height="8" fill="#F6F6F6" />
                        <rect x="20" y="24" width="8" height="8" fill="#F6F6F6" />
                        <rect x="0" y="24" width="8" height="8" fill="#F6F6F6" />
                    </g>
                </g>
            </g>

            {/* Liquid - Outer orbit (240 degrees offset) */}
            <g filter="url(#icon-glow)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`270 ${center} ${center}`}
                    to={`-90 ${center} ${center}`}
                    dur="30s"
                    repeatCount="indefinite"
                />
                <g transform={`translate(${center + outerOrbit - iconSize / 2}, ${center - iconSize / 2})`}>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${iconSize / 2} ${iconSize / 2}`}
                        to={`360 ${iconSize / 2} ${iconSize / 2}`}
                        dur="30s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                    {/* Liquid wave icon */}
                    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} fill="#0d1437" />
                    <g transform={`translate(${iconSize * 0.15}, ${iconSize * 0.2}) scale(${iconSize / 55})`}>
                        <path fill="url(#liquid-gradient)" d="M0 15c5-8 15-8 20 0s15 8 20 0v15H0V15z">
                            <animate attributeName="d"
                                values="M0 15c5-8 15-8 20 0s15 8 20 0v15H0V15z;M0 18c5 8 15-8 20 0s15-8 20 0v15H0V15z;M0 15c5-8 15-8 20 0s15 8 20 0v15H0V15z"
                                dur="2s"
                                repeatCount="indefinite" />
                        </path>
                    </g>
                </g>
            </g>

            {/* === CENTER KALEIDOSWAP LOGO === */}
            <g transform={`translate(${center - logoSize / 2}, ${center - logoSize / 2})`} filter="url(#strong-glow)">
                {/* Pulsing background circle */}
                <circle cx={logoSize / 2} cy={logoSize / 2} r={logoSize / 2 + 5} fill="url(#kaleido-gradient)" opacity="0.2">
                    <animate attributeName="r" values={`${logoSize / 2};${logoSize / 2 + 10};${logoSize / 2}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Kaleidoswap Logo */}
                <svg width={logoSize} height={logoSize} viewBox="0 0 210 210">
                    <g clipPath="url(#kaleido-clip)">
                        <path d="M69.7141 207.3H0.908203L35.3243 172.936L69.7141 207.3Z" fill="#6F32FF" />
                        <path d="M138.441 0.96106V69.767L104.078 35.3508L138.441 0.96106Z" fill="#17B581" />
                        <path d="M138.415 138.547V207.352L104.051 172.936L138.415 138.547Z" fill="#17B581" />
                        <path d="M138.441 69.7406V0.96106L172.804 35.3772L138.441 69.767V69.7406Z" fill="#17B581" />
                        <path d="M69.6614 138.494V69.6879L104.025 104.104L69.6614 138.494Z" fill="#15E99A" />
                        <path d="M69.6615 69.7142V138.52L35.2981 104.104L69.6615 69.7142Z" fill="#15E99A" />
                        <path d="M138.467 207.379V138.573L172.831 172.989L138.467 207.379Z" fill="#17B581" />
                        <path d="M0.908203 0.908325H69.7141L35.298 35.2718L0.908203 0.908325Z" fill="#6F32FF" />
                        <path d="M207.22 207.3H138.415L172.831 172.936L207.22 207.3Z" fill="#17B581" />
                        <path d="M138.415 0.987427H207.22L172.804 35.3509L138.415 0.987427Z" fill="#17B581" />
                        <path d="M138.467 69.7143H69.6614L104.078 35.3508L138.467 69.7143Z" fill="#17B581" />
                        <path d="M69.635 138.494H138.441L104.025 172.857L69.635 138.494Z" fill="#17B581" />
                        <path d="M138.415 138.494H69.635L104.025 104.157L138.388 138.494H138.415Z" fill="#15E99A" />
                        <path d="M138.415 69.7142L104.051 104.051L69.6614 69.7142H138.441H138.415Z" fill="#15E99A" />
                    </g>
                    <defs>
                        <clipPath id="kaleido-clip">
                            <rect width="208.183" height="208.183" fill="white" transform="translate(0.908203 0.908325)" />
                        </clipPath>
                    </defs>
                </svg>
            </g>

            {/* Swap arrow indicators */}
            <g opacity="0.8" filter="url(#glow)">
                {/* Animated swap arrows showing exchange flow */}
                <path
                    d={`M${center - 20} ${center + logoSize / 2 + 30} 
              Q${center} ${center + logoSize / 2 + 50} 
              ${center + 20} ${center + logoSize / 2 + 30}`}
                    stroke="#15E99A"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow)"
                >
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </path>
                <path
                    d={`M${center + 20} ${center - logoSize / 2 - 30} 
              Q${center} ${center - logoSize / 2 - 50} 
              ${center - 20} ${center - logoSize / 2 - 30}`}
                    stroke="#6F32FF"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow-purple)"
                >
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </path>
            </g>

            {/* Arrow markers */}
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#15E99A" />
                </marker>
                <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#6F32FF" />
                </marker>
            </defs>

            {/* Text label */}
            <text
                x={center}
                y={size - 30}
                textAnchor="middle"
                fill="url(#kaleido-gradient)"
                fontSize="18"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="600"
                opacity="0.9"
            >
                Swap Any Asset on Bitcoin L2
                <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </text>
        </svg>
    );
};

export default SwapOrbitAnimation;
