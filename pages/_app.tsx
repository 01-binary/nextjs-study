import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: any) => {
  console.log('b');

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
