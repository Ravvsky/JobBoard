type Criteria = {
  id: number;
} & Record<string, string>;
const JobOfferCriteriaList = ({
  listItems,
  title,
}: {
  listItems: Criteria[];
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="text-[2rem] font-semibold">{title}</div>

      <ul className="flex flex-col gap-[5px] marker:text-main-blue">
        {listItems.map((listItem, index: number) => {
          const keys = Object.keys(listItem);

          return (
            <li key={index} className="p-0 text-[1.8rem]">
              {listItem[keys[1]]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default JobOfferCriteriaList;
