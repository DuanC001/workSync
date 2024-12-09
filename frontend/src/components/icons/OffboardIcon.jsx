import React from 'react'
import { SvgIcon } from "@mui/material";

const OffboardIcon = ({color}) => {
  return (
    <SvgIcon fontSize='small' viewBox="0 0 24 24">
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99977 9.99935C12.301 9.99935 14.1664 9.13387 14.1664 6.83268C14.1664 4.5315 14.9998 1.66602 9.99977 1.66602C5.41644 1.66602 5.8331 4.5315 5.8331 6.83268C5.8331 9.13387 7.69858 9.99935 9.99977 9.99935Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 19C3 16.2357 6.01388 14 9.72447 14C10.159 14 10.5857 14.031 11 14.0904"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.1668 16.0007C19.1668 16.334 19.1252 16.6569 19.0418 16.9694C18.9481 17.3861 18.7814 17.7923 18.5627 18.1465C17.8439 19.3548 16.521 20.1673 15.0002 20.1673C13.9272 20.1673 12.9585 19.761 12.2293 19.0944C11.9168 18.8235 11.646 18.5006 11.4376 18.1465C11.0522 17.5215 10.8335 16.7819 10.8335 16.0007C10.8335 14.8757 11.2814 13.8444 12.0106 13.0944C12.771 12.3132 13.8335 11.834 15.0002 11.834C16.2293 11.834 17.3439 12.3653 18.0939 13.2194C18.7606 13.959 19.1668 14.9382 19.1668 16.0007Z"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.6664 15.9707H13.3262"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default OffboardIcon