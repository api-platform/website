import DropDown from "components/common/inputs/Dropdown";

interface GuideFilterDropdownProps {
  value?: string;
  onChange: (value?: string) => void;
  select: string[];
}

function ListItem({ value }: { value?: string }) {
  return <>{value}</>;
}

function CurrentValueComponent({ value }: { value?: string }) {
  return <>{value || "All"}</>;
}

export default function GuideFilterDropdown({
  value,
  onChange,
  select,
}: GuideFilterDropdownProps) {
  return (
    <DropDown
      values={select}
      value={value}
      onChange={onChange}
      ListItem={ListItem}
      CurrentValueComponent={CurrentValueComponent}
      label="Type"
    />
  );
}
