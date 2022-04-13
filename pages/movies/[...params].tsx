import { useRouter } from "next/router";
import Seo from "../../components/Seo";

const MovieDetail = ({ params }: any) => {
  const router = useRouter();
  console.log("c");

  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
};

export default MovieDetail;

export function getServerSideProps({ params: { params } }: any) {
  console.log("a");
  return {
    props: { params },
  };
}
