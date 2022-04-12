import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }: any) => {
  return (
    <div>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  // Fetch necessary data for the blog post using params.id
  console.log(params);
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
