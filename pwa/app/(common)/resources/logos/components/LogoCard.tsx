import Card from "components/common/Card";

interface LogoCardProps {
  imageName: string;
}

function FormatDownload({
  extension,
  imageName,
}: {
  extension: string;
  imageName: string;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`/images/logos/${imageName}.${extension}`}
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
        {`.${extension}`}
      </span>
    </a>
  );
}

export default function LogoCard({ imageName }: LogoCardProps) {
  return (
    <Card hoverable bordered padding className="flex flex-col w-full">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`/images/logos/${imageName}.svg`}
        className="w-full aspect-[2/1] p-4 overflow-hidden bg-checkboard bg-gray-500/10 bg-4 bg-left-top dark:bg-checkboard-dark"
      >
        <img
          src={`/images/logos/${imageName}.svg`}
          width="330"
          height="200"
          alt=""
          className="object-contain w-full h-full"
        />
      </a>
      <div className="flex justify-center text-xs font-semibold text-blue pt-3">
        <FormatDownload imageName={imageName} extension="png" />
        <FormatDownload imageName={imageName} extension="svg" />
      </div>
    </Card>
  );
}
