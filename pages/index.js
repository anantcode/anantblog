import Head from "next/head";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <h2>Hello Anant!!</h2>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: "The Posts" }, //test
  };
}
