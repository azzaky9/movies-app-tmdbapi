import "../Movies/MoviesInfo.css";

const innerShadow = ({ model }: { model: "landscape" | "portrait" }) => {
  return (
    <>
      {model === "landscape" ? (
        <div className='landscape_inners'></div>
      ) : (
        <div className='portrait_inners'></div>
      )}
    </>
  );
};

export default innerShadow;
