import React from "react";

interface TransportLineProps {
  time: string;
  from: string;
  link?: string;
}

function TransportContent({ time, from }: TransportLineProps) {
  return (
    <div className="border-r-2 border-dotted border-r-blue-light p-3 uppercase flex flex-col | md:border-none">
      <span className="text-white text-md font-thin">{time}</span>
      <span className="text-xs font-semibold">{from}</span>
    </div>
  );
}

export default function Transport({ time, from, link }: TransportLineProps) {
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <TransportContent time={time} from={from} />
    </a>
  ) : (
    <TransportContent time={time} from={from} />
  );
}
