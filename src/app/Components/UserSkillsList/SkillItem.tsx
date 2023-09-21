const SkillItem = ({
  item,
  onRemove,
}: {
  item: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex justify-between rounded-[1rem] bg-main-gray p-[2rem]">
      {item}
      <button type="button" onClick={onRemove}>
        X
      </button>
    </div>
  );
};

export default SkillItem;
