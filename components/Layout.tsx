import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
