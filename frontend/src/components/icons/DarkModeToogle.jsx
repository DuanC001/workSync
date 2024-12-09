import React from "react";
import { SvgIcon } from "@mui/material";

const DarkModeToogle = () => {
  return (
    <SvgIcon
      fontSize="inherit"
      sx={{ display: { xs: "none", sm: "none" , md:'block' }, fontSize: "50px" }}
    >
      <svg
        width="62"
        height="38"
        viewBox="0 0 62 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" width="60" height="32" rx="16" fill="#F5F5F5" />
        <g filter="url(#filter0_d_99_33260)">
          <circle cx="18" cy="16" r="12" fill="white" />
        </g>
        <circle
          cx="17.9977"
          cy="16.0017"
          r="4.32001"
          fill="#FA6432"
          stroke="#FA6432"
        />
        <path d="M18 8.80078V9.52078" stroke="#FA6432" strokeLinecap="round" />
        <path d="M18 22.4805V23.2005" stroke="#FA6432" strokeLinecap="round" />
        <path
          d="M25.1992 16L24.4792 16"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          d="M11.5195 16L10.7995 16"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          d="M23.0898 10.9102L22.807 11.193"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          d="M13.1914 20.8086L12.9086 21.0914"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          d="M23.0898 21.0918L22.807 20.809"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          d="M13.1914 11.1934L12.9086 10.9105"
          stroke="#FA6432"
          strokeLinecap="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M53.2008 18.3431C52.5959 18.5113 51.9575 18.6014 51.2975 18.6014C47.4632 18.6014 44.355 15.5616 44.355 11.8119C44.355 10.7305 44.6135 9.70818 45.0733 8.80078C41.5212 9.33402 38.8008 12.3357 38.8008 15.9587C38.8008 19.9584 42.1163 23.2008 46.2061 23.2008C49.4418 23.2008 52.1928 21.1714 53.2008 18.3431Z"
          fill="#0A0B1A"
        />
        <defs>
          <filter
            id="filter0_d_99_33260"
            x="0"
            y="2"
            width="36"
            height="36"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.335677 0 0 0 0 0.335677 0 0 0 0 0.335677 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_99_33260"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_99_33260"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default DarkModeToogle;
