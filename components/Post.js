import Link from "next/link"; //because we want link to single post from this component

export default function Post({ post }) {
  return (
    <div class="card">
      <img src={post.frontmatter.cover_image} />
      <div className="post-date">Posted on {post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}
