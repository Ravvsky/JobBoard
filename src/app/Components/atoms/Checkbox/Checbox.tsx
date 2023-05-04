const Checkbox = ({
  width,
  height,
  id,
  value,
}: {
  width: number;
  height: number;
  id: string;
  value: string;
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      value={value}
      className={`peer h-[${height}rem] w-[${width}rem] rounded-[0.4rem] border-[1px] border-solid border-main-blue border-opacity-40	bg-light-gray checked:bg-main-blue focus:ring-transparent  focus:ring-offset-0	checked:focus:bg-main-blue`}
    />
  );
};

export default Checkbox;
