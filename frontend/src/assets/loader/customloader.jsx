import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Define the keyframes for the spinning dash
const dash = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -300;
  }
`;

// Create a styled svg component that applies the dash animation
const RotatingSvg = styled.svg`
  circle {
    stroke-dasharray: 150;
    stroke-dashoffset: 0;
    animation: ${dash} 1.5s linear infinite;
  }
`;

export default function CustomSpinner() {
  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateValue(prevRotateValue => (prevRotateValue + 1) % 360);
    }, 5);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RotatingSvg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5533" />
            <stop offset="100%" stopColor="#FF5533" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="28"
          cy="28"
          r="24"
          transform={`rotate(${rotateValue} 28 28)`}
          stroke="url(#spinnerGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </RotatingSvg>
    </Box>
  );
}
