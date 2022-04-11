import NavBar from "../components/NavBar";
import "../styles/globals.css";

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        a {
          color: white;
        }
      `}</style>
    </>
  );
};

export default App;
