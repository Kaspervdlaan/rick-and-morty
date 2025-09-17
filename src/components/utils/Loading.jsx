const Loading = ({ subject }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div
        className={`animate-spin rounded-full h-12 w-12 border-b-4 border-green-800`}
      ></div>
      LOADING {subject} ...
    </div>
  );
};

export default Loading;