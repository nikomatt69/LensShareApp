interface Props {
  asset: File | null;
  progress: string | null;
}

const Asset = ({ asset, progress }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-[40%] mt-8">
      <div className="flex flex-row items-center ">
        <div className="flex flex-col justify-center items-start ml-8">
          <p className="text-md font-semibold text-gray-800">{asset?.name}</p>
          <p>{progress}</p>
        </div>
      </div>
    </div>
  );
};

export default Asset;
