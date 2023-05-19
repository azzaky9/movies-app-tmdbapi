interface TitleTypes {
  title: string;
  date: string;
  size?: string | number;
}

const Title: React.FC<TitleTypes> = ({ title, date, size }) => {
  return (
    <h3 className={`text-[${size}] font-semibold mb-4`}>
      {title}
      {/* Get only year from date Props  */} ({date?.substring(0, 4)})
    </h3>
  );
};

export default Title;
