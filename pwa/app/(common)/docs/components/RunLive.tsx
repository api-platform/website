import React from "react";

export default function RunLive({
  executable,
  slug,
}: {
  executable: boolean;
  slug: string;
}) {
  if (!executable) {
    return;
  }

  const link = `/playground/${slug}`;
  return (
    <div className="fixed right-0 top-15 z-10 h-16 w-16">
      <div className="absolute transform bg-gray-600 text-center text-white font-semibold py-1 right-[0px] top-[0px] w-[170px]">
        <a href={link} target="_blank">
          Run Live
        </a>
      </div>
    </div>
  );
}
