import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }: any) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  // Fetch necessary data for the blog post using params.id
  console.log(params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
