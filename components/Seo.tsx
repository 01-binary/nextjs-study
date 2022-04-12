import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
}

const Seo: FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
};

export default Seo;
