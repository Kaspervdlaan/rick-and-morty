const Wrapper = ({ children }) => (
  <div className="flex flex-col w-[90vw] max-w-7xl h-full items-center gap-2 md:px-2 pb-4">
    {children}
  </div>
);

export default Wrapper;