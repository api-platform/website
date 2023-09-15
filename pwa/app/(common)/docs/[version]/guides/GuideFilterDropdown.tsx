import DropDown from "components/common/inputs/Dropdown";

interface GuideFilterDropdownProps {
  value?: string;
  onChange: (value?: string) => void;
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
}: GuideFilterDropdownProps) {
  const tags = ["Doctrine", "State", "Design", "Serialization", "Validation"]; // TODO: dynamiser
  return (
    <DropDown
      values={tags}
      value={value}
      onChange={onChange}
      ListItem={ListItem}
      CurrentValueComponent={CurrentValueComponent}
      label="Type"
    />
  );
}
