import { Stack, Skeleton } from "@mui/material";

interface PropTypes {
  count: number;
  size: string | number;
  skeletonSizeList: ("100%" | "80%" | "75%" | "50%")[];
}

export const SkeletonText: React.FC<PropTypes> = ({ count, size, skeletonSizeList }) => {
  const dummy: string[] = new Array(count).fill("");

  return (
    <Stack sx={{ p: 1 }}>
      {dummy.map((d, i) => (
        <Skeleton
          key={i}
          variant='text'
          animation='wave'
          sx={{ fontSize: size, width: skeletonSizeList[i] }}>
          {d}
        </Skeleton>
      ))}
    </Stack>
  );
};

export const CoverSkeleton = () => {
  return (
    <div className='h-[330px]'>
      <div className='bg-input-only w-[210px] max-w-[400px] h-[300px] rounded-xl pt-2'>
        <Skeleton
          variant='rectangular'
          animation='wave'
          height='190px'
          sx={{ mx: 1 }}
        />
        <SkeletonText
          count={4}
          size='12px'
          skeletonSizeList={["100%", "100%", "75%", "50%"]}
        />
      </div>
    </div>
  );
};
