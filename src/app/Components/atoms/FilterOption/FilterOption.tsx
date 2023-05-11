"use client";
import { useAppDispatch } from "@/redux/hooks";
import Checkbox from "../Checkbox/Checbox";
import { setFilter } from "@/redux/features/jobOfferFilters";

const FilterOption = ({
  label,
  category,
}: {
  label: string;
  category: string;
}) => {
  const dispatch = useAppDispatch();
  const changeHandler = () => {
    dispatch(setFilter({ category, value: label }));
  };
  return (
    <>
      <Checkbox
        id={label}
        height={2}
        width={2}
        value={""}
        onChange={changeHandler}
        data-cy="checkbox"
      />
      <label
        htmlFor={label}
        className="flex py-[1rem] hover:cursor-pointer"
        data-cy="label"
      >
        <div>{label}</div>
      </label>
    </>
  );
};

export default FilterOption;
