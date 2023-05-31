import { useGenre } from "../../../hooks/useGenre";

interface GenrePropTypes {
  lists: (string | number)[];
  model: "portrait" | "landscape";
}

const Genre: React.FC<GenrePropTypes> = ({ model, lists }) => {
  const { genreNames } = useGenre(lists);

  const RenderPortraitRatioELement = () => {
    return (
      <ul className='text-sm py-2 text-accent'>
        <li>
          {genreNames[0]?.name} / {genreNames[1]?.name}
        </li>
      </ul>
    );
  };

  const RenderLandscapeRatioElement = () => {
    return (
      <ul className='flex flex-wrap gap-2 py-2'>
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
  };

  return (
    <>{model === "landscape" ? <RenderLandscapeRatioElement /> : <RenderPortraitRatioELement />}</>
  );
};

export default Genre;
