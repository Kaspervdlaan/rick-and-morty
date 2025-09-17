const Wrapper = ({ children }) => (
  <div className="flex flex-col gap-2 bg-gradient-to-t from-green-300 to-green-800 px-2 pb-4">
    {children}
  </div>
);

export default Wrapper;