interface IconProps {
    size?: number;
}

export default function OnlyFansIcon({size = 48}: IconProps) {
    return (
        // OnlyFans_Social_Icon_Rounded_White.svg
        <svg width={`${size}`} height={`${size}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <circle cx="153.13" cy="206.25" r="28.12" fill="white"/>
            <path
                d="M0,50V350a50,50,0,0,0,50,50H350a50,50,0,0,0,50-50V50A50,50,0,0,0,350,0H50A50,50,0,0,0,0,50ZM258.5,182.81c23.82,6.85,51.94,0,51.94,0-8.16,35.63-34,57.94-71.35,60.66a93.54,93.54,0,0,1-86,56.53h0a93.75,93.75,0,1,1,61.31-164.55c17-20.63,38.67-22.95,79.12-22.95h47.08C332.75,147.19,305.61,173.69,258.5,182.81Z"
                fill="white"
            />
            <path
                d="M181.25,210.61c11.86-37.69,21.39-60.81,33.18-75.16A93.71,93.71,0,1,0,153.12,300h0ZM125,206.25a28.13,28.13,0,1,1,28.13,28.13A28.08,28.08,0,0,1,125,206.25Z"
                fill="none"
            />
        </svg>
    );
}