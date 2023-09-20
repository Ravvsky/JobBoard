const SkillBadge = ({ item }: { item: string }) => {
  return (
    <div
      className={`rounded-[999px] bg-main-blue  px-[2rem] font-medium text-black`}
    >
      {item}
    </div>
  );
};
export default SkillBadge;
