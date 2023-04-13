import DropDown from "components/common/inputs/Dropdown";

interface EventFilterDropDownProps {
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
}

export default function EventFilterDropDown({
  value,
  onChange,
  className,
}: EventFilterDropDownProps) {
  const types = ["Meetup", "Workshop", "Hackday", "Conference"]; // TODO: dynamiser
  return (
    <DropDown
      values={types}
      value={value}
      onChange={onChange}
      label="Type"
      className={className}
    />
  );
}
