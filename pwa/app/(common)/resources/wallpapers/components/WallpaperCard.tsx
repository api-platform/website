import Card from "components/common/Card";
import Image from "next/image";

interface WallpaperCardProps {
  imageName: string;
}

function SizeDownload({
  imageName,
  width,
  height,
}: {
  imageName: string;
  width: number;
  height: number;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`/images/wallpapers/${imageName}-${width}-${height}.jpg`}
      className="flex flex-col items-center border-r-px border-r-blue/50 border-dotted last:border-r-0 px-4 transition-all group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="stroke-blue-light transition-all w-6 h-6 group-hover:stroke-blue group-hover:scale-125 group-hover:-translate-y-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      <span className="text-gray-500 transition-all group-hover:text-blue">
        {" "}
        {`${width}x${height}`}
      </span>
    </a>
  );
}

export default function WallpaperCard({ imageName }: WallpaperCardProps) {
  return (
    <Card hoverable padding className="flex flex-col w-full" bordered>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`/images/wallpapers/${imageName}-2880-1800.jpg`}
        className="w-full aspect-[4/3] overflow-hidden"
      >
        <Image
          src={`/images/wallpapers/${imageName}-660-400.jpg`}
          width="330"
          height="200"
          alt=""
          className="object-cover w-full h-full transition-all duration-300 group-hover/card:scale-110 group-hover/card:opacity-70"
        />
      </a>
      <div className="flex justify-center text-xs font-semibold text-blue pt-3">
        <SizeDownload imageName={imageName} width={2880} height={1800} />
        <SizeDownload imageName={imageName} width={1920} height={1200} />
        <SizeDownload imageName={imageName} width={1920} height={1080} />
      </div>
    </Card>
  );
}
