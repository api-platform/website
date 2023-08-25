import classNames from "classnames";

export default function ReferenceTypeIcon({ type = "" }: { type?: string }) {
  let colorClassName;
  switch (type.toLowerCase()) {
    case "class":
      colorClassName = "bg-blue";
      break;
    case "interface":
      colorClassName = "bg-[#c41d77]";
      break;
    case "trait":
      colorClassName = "bg-[#7CB342]";
      break;
    case "attribute":
      colorClassName = "bg-[#f09f17]";
      break;
    default:
      colorClassName = "bg-[#6E6E6E]";
  }

  return (
    <div
      className={classNames(
        colorClassName,
        "w-5 h-5 text-white flex items-center justify-center mr-2 text-xs font-bold dark:text-blue-black"
      )}
    >
      {type ? type.substring(0, 1) : ""}
    </div>
  );
}
