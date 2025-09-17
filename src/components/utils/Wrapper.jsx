const Wrapper = ({ children }) => (
  <div className="flex flex-col items-center gap-2 bg-gradient-to-t from-green-400 to-green-900 px-2 pb-4">
    {children}
  </div>
);

export default Wrapper;