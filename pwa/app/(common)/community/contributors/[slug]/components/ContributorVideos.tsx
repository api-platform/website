import Image from "next/image";

export default function ContributorVideos({
  conferences,
}: {
  conferences: { title: string; youtubeLink: string; imageLink: string }[];
}) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full">
      {conferences.map((conference) => (
        <a
          href={conference.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-blue-black dark:border-blue-dark dark:border-px relative shadow-md w-full aspect-[4/3] p-2 transition-all hover:shadow-xl group"
          key={conference.title}
          title={conference.title}
        >
          <Image
            width={480}
            height={360}
            src={conference.imageLink}
            alt=""
            className="w-full h-full object-cover brightness-75 group-hover:brightness-125 transition-all duration-500"
          />
        </a>
      ))}
    </div>
  );
}
