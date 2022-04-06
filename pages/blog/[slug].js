import fs from "fs";
import path from "path";

export default function PostPage() {
  return <div>post</div>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  console.log(paths);

  return {
    paths, //  paths will be like [{params: {slug: 1}}]
    fallback: false, //if doesnt find a page, for 404
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
