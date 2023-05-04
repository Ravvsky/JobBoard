import Checkbox from "../Checkbox/Checbox";

const FilterOption = ({ label }: { label: string }) => {
  return (
    <>
      <Checkbox id={label} height={2} width={2} value={""} />
      <label htmlFor={label} className="flex py-[1rem] hover:cursor-pointer">
        <div>{label}</div>
      </label>
    </>
  );
};

export default FilterOption;
