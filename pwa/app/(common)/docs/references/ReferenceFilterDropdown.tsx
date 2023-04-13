import DropDown from "components/common/inputs/Dropdown";
import ReferenceTypeIcon from "./ReferenceTypeIcon";

interface ReferenceFilterDropdownProps {
  value?: string;
  onChange: (value?: string) => void;
}

function ListItem({ value }: { value?: string }) {
  return (
    <>
      <ReferenceTypeIcon type={value} />
      {value}
    </>
  );
}

function CurrentValueComponent({ value }: { value?: string }) {
  return (
    <>
      {value && <ReferenceTypeIcon type={value} />}
      {value || "All"}
    </>
  );
}

export default function ReferenceFilterDropdown({
  value,
  onChange,
}: ReferenceFilterDropdownProps) {
  const types = ["Trait", "Interface", "Class", "Attribute"]; // TODO: dynamiser
  return (
    <DropDown
      values={types}
      value={value}
      onChange={onChange}
      ListItem={ListItem}
      CurrentValueComponent={CurrentValueComponent}
      label="Type"
    />
  );
}
