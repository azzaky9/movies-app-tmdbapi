interface TitleTypes {
  title: string;
  date: string;
  size?: "base" | "medium" | "large";
}

const Title: React.FC<TitleTypes> = ({ title, date, size }) => {
  const classBasedCondition = `${
    size === "base" ? "text-base" : size === "medium" ? "text-[18px]" : "text-[24px]"
  } font-semibold mb-4`;

  return (
    <h3 className={classBasedCondition}>
      {title}
      {/* Get only year from date Props  */}{" "}
      <span className='text-sm'>({date?.substring(0, 4)})</span>
    </h3>
  );
};

export default Title;
