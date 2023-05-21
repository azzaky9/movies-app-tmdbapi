import { useGenre } from "../../../hooks/useGenre";

interface GenrePropTypes {
  lists: (string | number)[];
  model: "portrait" | "landscape";
}

const Genre: React.FC<GenrePropTypes> = ({ model, lists }) => {
  const { genreNames } = useGenre(lists);

  if (model === "landscape") {
    return (
      <ul className='flex flex-wrap gap-1 py-2'>
        {genreNames?.map((item, index) => (
          <li
            key={index}
            className=''>
            {item?.name}
          </li>
        ))}

        <span className='text-accent'>&#8226; Movies</span>
      </ul>
    );
  }

  return (
    <ul className='text-sm flex gap-1 py-2 text-accent'>
      <li>{genreNames[0]?.name} /</li>
      <li>{genreNames[1]?.name}</li>
    </ul>
  );
};

export default Genre;
