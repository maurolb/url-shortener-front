export const Layout = ({ children = <></> }) => {
  return (
    <div className="h-screen flex pt-[14vh] lg:pt-[30vh] justify-center bg-slate-900">
      <div className="w-full lg:w-1/3 px-4 lg:px-0">{children}</div>
    </div>
  );
};
