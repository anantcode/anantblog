import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "../utils";
import Head from "next/head";
import Post from "../components/Post";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts directory.
  const filesDirent = fs
    .readdirSync(path.join("posts"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isFile());

  const files = filesDirent.map((dirent) => {
    return dirent.name;
  });

  console.log(files);

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    console.log(markdownWithMeta);

    // destructring - renaming the data to frontmatter.
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  console.log(posts);

  return {
    props: { posts: posts.sort(sortByDate) },
  };
}
