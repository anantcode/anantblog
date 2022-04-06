import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { marked } from "marked";

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="postdate">Posted on {date}</div>
        <img src={cover_image} alt="" />
        <div className="post-body">
          {/* will use marked here - will insert the MD HTML here 
          Basicall inserting HTML - when we do that within JSX we have
          to use an attribute called dangerouslySetInnerHTML. 

          It is set with double curly braces, like {{__html: }}*/}
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
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

export async function getStaticProps({ params: { slug } }) {
  console.log(slug);

  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
