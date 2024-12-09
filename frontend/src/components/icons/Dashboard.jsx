import React from "react";
import { SvgIcon } from "@mui/material";

const Dashboard = ({color , fill}) => {
  return (
    <SvgIcon fontSize="small" viewBox="0 0 24 24">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill={fill || 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0537 6.76697L13.2322 7.94548C14.4107 9.12399 15.5893 9.12399 16.7678 7.94548L17.9463 6.76697C19.1248 5.58846 19.1248 4.40995 17.9463 3.23143L16.7678 2.05292C15.5893 0.874412 14.4107 0.874412 13.2322 2.05292L12.0537 3.23143C10.8752 4.40995 10.8752 5.58846 12.0537 6.76697Z"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.1665 18.3327H5.83317C7.49984 18.3327 8.33317 17.4993 8.33317 15.8327V14.166C8.33317 12.4993 7.49984 11.666 5.83317 11.666H4.1665C2.49984 11.666 1.6665 12.4993 1.6665 14.166V15.8327C1.6665 17.4993 2.49984 18.3327 4.1665 18.3327Z"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.99984 8.33268C6.84079 8.33268 8.33317 6.8403 8.33317 4.99935C8.33317 3.1584 6.84079 1.66602 4.99984 1.66602C3.15889 1.66602 1.6665 3.1584 1.6665 4.99935C1.6665 6.8403 3.15889 8.33268 4.99984 8.33268Z"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.9998 18.3327C16.8408 18.3327 18.3332 16.8403 18.3332 14.9993C18.3332 13.1584 16.8408 11.666 14.9998 11.666C13.1589 11.666 11.6665 13.1584 11.6665 14.9993C11.6665 16.8403 13.1589 18.3327 14.9998 18.3327Z"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default Dashboard;
