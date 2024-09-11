type WebbyChoiceProps = {
  className?: string;
  percentEyes: number;
};

export default function WebbyChoice({
  className,
  percentEyes,
}: WebbyChoiceProps) {
  const minPos = -15;
  const maxPos = 8;

  const positionEyes = minPos + (percentEyes / 100) * (maxPos - minPos);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 275.34 362.6"
      className={className}
    >
      <g style={{ transform: `translateX(${positionEyes}%)` }}>
        <path
          fill="#fff"
          strokeWidth="0"
          d="M176.61 118.41c2.04 25.18-12.83 46.74-34.27 48.8s-40.47-16.68-42.52-41.85c-2.04-25.18 10.09-40.04 31.53-42.1 21.44-2.06 43.21 9.99 45.25 35.16z"
        ></path>
        <path
          strokeWidth="0"
          d="M130.03 81.06c-11.14 1.07-21.18 7.14-28.28 17.09-7.04 9.87-6.76 15.18-5.72 28.03 1.04 12.85 6.31 24.55 14.84 32.92 8.59 8.45 19.46 12.51 30.59 11.44 4.75-.46 9.22-1.81 13.28-3.91 15.43-7.96 25.17-26.65 23.45-47.91-2.18-26.9-25.77-39.82-48.17-37.67zm10.99 83.96c-19.92 1.91-37.68-15.74-39.6-39.35-.93-11.46-1.59-15.4 4.65-24.17 3.6-5.06 8.04-8.97 13.01-11.53 3.57-1.84 7.41-2.99 11.41-3.37 9.49-.91 20.83.72 28.12 8.26 7.28 7.53 13.28 12.84 14.22 24.4 1.93 23.77-12.04 43.87-31.8 45.77z"
        ></path>
        <path
          fill="#fff"
          strokeWidth="0"
          d="M211.43 119.52c1.72 21.15-11.88 39.73-30.36 41.51-18.48 1.78-34.86-13.93-36.58-35.08-1.72-21.15 9.64-35.23 28.12-37 18.48-1.78 37.1 9.42 38.82 30.57z"
        ></path>
        <path
          strokeWidth="0"
          d="M171.27 86.58c-9.73.93-18.51 6.14-24.73 14.65-6.16 8.43-6.82 14.6-5.93 25.56.89 10.96 5.47 20.91 12.89 28.04 7.49 7.19 16.98 10.64 26.71 9.7 4.23-.41 8.23-1.62 11.88-3.51 13.61-7.02 22.48-23.28 21.02-41.2-1.85-22.73-21.85-35.16-41.84-33.24zm36.27 33.77c1.25 15.42-6.29 29.4-17.87 35.37a27.33 27.33 0 01-9.94 2.94c-8.12.78-16.09-2.14-22.43-8.21-6.41-6.14-10.36-14.73-11.13-24.2-1.25-15.42 4.05-24.89 15.63-30.86a27.33 27.33 0 019.94-2.94c8.12-.78 17.78 1.48 24.12 7.55 6.41 6.14 10.91 10.88 11.67 20.35z"
        ></path>
      </g>
      <ellipse
        cx="30.57"
        cy="340.11"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="22.27"
        ry="6.03"
        transform="rotate(-1.05 30.716 340.255)"
      ></ellipse>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M70.35 278.61L65.12 278.7 27.69 160.7 73.58 178.32 70.29 181.84 34.02 169.66 70.35 278.61z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M53.36 316.18L51.12 324.62 0 162.31 77.98 193.1 73.41 196.9 7.19 170.26 53.36 316.18z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M110.43 338.75L29.62 213.85 97.65 219.35 99.71 224.26 40.66 219.86 117.51 338.45 110.43 338.75z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M124.61 179.9L127.4 257.15 121.48 256.5 117.21 174.94"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M121.22 255.74s-6.77-11.57-13.8-4c-7.03 7.57-2.69 17.77-2.69 17.77s2.41 3.15 10.39 3.35c7.98.21 9.86-.18 11.31-2.69 1.45-2.51 1.01-13.66 1.01-13.66l-6.21-.77zM51.27 323.63c2.1 3.1-14.11-16.06-23.57-7.34-11.46 10.56-4.45 24.73-4.45 24.73s3.88 3.42 16.85 3.2c16.88-.29 15.54-4.7 16.65-9.07 1.86-7.33-4.61-22.5-4.61-22.5l-.87 10.97zM65.08 276.27s-3.25-10.81-10.82-3.78c-4.5 4.18-4.69 9.21-4.1 12.6a6.685 6.685 0 005.23 5.43c1.69.35 3.99.75 7.06.56 11.19-.69 9.58-4.19 9.58-5.83.03-9.45-3.62-15.14-3.62-15.14l-3.34 6.16zM110.34 337.93s-10.14-16.84-21.88-6.28c-11.74 10.57-2.73 23.78-2.73 23.78s3.98 4.13 17.27 3.91c17.29-.29 18.66-9.13 17.34-13.5-4.58-15.17-7.31-8.2-7.14-8.53l-2.86.63z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M222.89 275.81L229.05 275.7 246.56 167.82 175.73 207.07 177.4 216.06 238.75 178.9 222.89 275.81z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M221.74 311.24L227.01 316.75 256.07 237.41 173.65 217.33 168.22 224.85 246.32 241.96 221.74 311.24z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M150.76 339.87L161.77 251.33 126.77 225.31 124.92 232.15 154.65 256.74 144.6 339.81 150.76 339.87z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M165.05 185.01L165.15 259.31 170.98 261.45 172.27 179.78"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M171.22 260.68s5.42-11.79 12.71-4.49c7.3 7.31 3.34 17.66 3.34 17.66s-2.29 3.23-10.26 3.73-9.86.18-11.4-2.27c-1.54-2.45-.22-20.71-.22-20.71l5.82 6.08zM227.76 315.76s9.57-19.23 21.41-9.09c6.69 5.73 7.53 12.83 6.99 17.92-.48 4.59-3.9 8.38-8.4 9.39-2.46.55-5.72.99-9.96 1.07-16.88.33-16.66-5.97-17.93-10.29-2.13-7.25 2.22-14.59 2.22-14.59l5.67 5.6zM229.01 274.19s5.58-13.76 13.41-7.01c4.42 3.82 4.98 8.54 4.62 11.93a7.115 7.115 0 01-5.53 6.23c-1.63.37-3.79.66-6.6.72-11.15.22-11.74-2.54-12.57-5.42-1.41-4.83 3.03-17.12 3.03-17.12l3.65 10.67zM151.66 334.39s8.6-16.26 20.72-6.13c12.12 10.13 5.47 24.55 5.47 24.55s-3.83 4.27-17.12 4.54c-17.29.34-18.41-8.33-17.82-12.86 2.44-19.01 5.79-14.34 5.79-14.34l2.95 4.24z"
      ></path>
      <path
        fill="#38a9b4"
        strokeWidth="0"
        d="M173.33 109.72c42.62 30.94 41.03 54.81 13.36 92.91-21.85 30.1-56.77 39.69-91.38 14.56-34.61-25.13-30.01-56.72-8.16-86.81 21.85-30.1 51.56-45.78 86.18-20.66z"
      ></path>
      <path
        fill="#1d1e1c"
        strokeWidth="0"
        d="M189.01 205.47c-11.56 15.92-26.33 25.99-42.74 29.13-17.56 3.36-36-1.52-53.35-14.11-32.37-23.5-35.55-55.11-9.19-91.43 26.7-36.78 58.97-44.28 90.88-21.11 17.28 12.54 32.63 28.03 34.59 46.35 1.78 16.68-8.73 35.39-20.2 51.18zm-99.54-72.25c-24.3 33.47-21.9 61.13 7.13 82.2 30.88 22.41 64.09 17.01 86.67-14.11 28.73-39.57 26.08-60.41-12.34-88.3-36.16-26.25-64.26-3.5-81.47 20.21z"
      ></path>
      <ellipse
        cx="95.32"
        cy="354.7"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="24.58"
        ry="7.89"
        transform="rotate(-1.05 95.52 355.038)"
      ></ellipse>
      <ellipse
        cx="57.86"
        cy="285.33"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="14.38"
        ry="6.49"
        transform="rotate(-1.05 57.958 285.389)"
      ></ellipse>
      <ellipse
        cx="111.36"
        cy="267.65"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="16.24"
        ry="6.49"
        transform="rotate(-1.05 111.598 267.872)"
      ></ellipse>
      <ellipse
        cx="253.08"
        cy="330.47"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="22.27"
        ry="6.03"
        transform="rotate(-1.05 253.45 330.837)"
      ></ellipse>
      <ellipse
        cx="176.93"
        cy="352.28"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="24.58"
        ry="7.89"
        transform="rotate(-1.05 176.852 352.509)"
      ></ellipse>
      <ellipse
        cx="245.22"
        cy="280.97"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="14.38"
        ry="6.49"
        transform="rotate(-1.05 245.174 281.102)"
      ></ellipse>
      <ellipse
        cx="188.46"
        cy="272.73"
        fill="#1d1e1c"
        strokeWidth="0"
        opacity="0.2"
        rx="16.24"
        ry="6.49"
        transform="rotate(-1.05 188.496 272.942)"
      ></ellipse>
      <path
        fill="#070707"
        strokeWidth="0"
        d="M120.05 193.16H123.35V212.63H120.05z"
        transform="rotate(123.93 121.7 202.901)"
      ></path>
      <path
        fill="#070707"
        strokeWidth="0"
        d="M120.05 193.16H123.35V212.63H120.05z"
        transform="rotate(68.94 121.699 202.917)"
      ></path>
      <path
        fill="#fff"
        strokeWidth="0"
        d="M162.05 55.21c.15 5.74-8.38 6.11-8.73.38-.15-5.74 8.38-6.11 8.73-.38zM143.75 17.98C141.56 7.37 150.67-1.68 161.29.27c13.94 2.82 14.82 21.29 5.74 29.94-4.3 3.68-8.55 10.36-8.8 15.42-.25 2.99-2.68 2.53-3.33-.21-2.02-12.61 5.1-15.27 8.89-24.69 3.69-15.46-13.83-14.58-17.85-2.6-.42 1.02-1.98.99-2.18-.14zM143.91 53.59c2.05 3.61-3.26 6.75-5.44 3.22-2.05-3.61 3.26-6.75 5.44-3.22zM119.53 36.08c-5.02-6.02-2.29-14.9 5.15-17.28 9.85-2.95 16.72 8.53 13.87 17.14-1.49 3.82-1.92 9.53-.36 12.84.86 1.99-.84 2.53-2.2 1-5.59-7.36-1.95-11.48-2.75-18.78-2.92-11.12-13.8-4.59-12.28 4.43.08.79-.92 1.31-1.44.65zM175.73 59.98c-1.59 2.34-5.1.03-3.59-2.36 1.59-2.34 5.1-.03 3.59 2.36zM179.13 39.84c2.18-4.87 8.42-5.86 12.1-2.03 4.76 5.14-.2 12.77-6.32 13.61-2.78.23-6.4 1.68-7.95 3.63-.96 1.12-1.8.24-1.27-1.04 2.82-5.62 6.43-4.63 10.65-7.31 5.92-5.12-1.33-9.8-6.39-6.17-.46.29-1.07-.17-.83-.68z"
      ></path>
    </svg>
  );
}
