import Link from "next/link"; //because we want link to single post from this component

export default function Post({ post }) {
  return (
    <div class="card">
      <img src={post.frontmatter.cover_image} />
    </div>
  );
}
