import Arrow from "components/icons/arrow";
import { PropsWithChildren } from "react";

export default function ListPoint({ children }: PropsWithChildren) {
  return (
    <li className="mb-8 last:mb-0 flex flex-row justify-start text-left">
      <Arrow className=" text-blue w-7 h-7 mr-4" />
      <p className="flex-1">{children}</p>
    </li>
  );
}
