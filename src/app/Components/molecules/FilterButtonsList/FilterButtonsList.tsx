import FilterButton from "../FilterButton/FilterButton";

const FilterButtonsList = () => {
  return (
    <div className="flex gap-[2rem]">
      <FilterButton type={"button"} category={"work-preference"}>
        Remote
      </FilterButton>
      <FilterButton type={"button"} category={"work-preference"}>
        Hybrid
      </FilterButton>
      <FilterButton type={"button"} category={"work-preference"}>
        On Site
      </FilterButton>
    </div>
  );
};
export default FilterButtonsList;
