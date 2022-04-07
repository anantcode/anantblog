---
title: "Creating Blog with Next.js and Markdown"
date: "April 7 2022"
excerpt: "How to create a blog with Next.js and Markdown."
cover_image: "/images/posts/img2.jpg"
---

Thanks to Traversy Media for [content](https://www.youtube.com/watch?v=MrjeefD8sac) that is referenced here.

## Next.js Setup and Styling

```bash
$ npx create-next-app blog
```

```powershell
npm i marked gray-matter
```

### To run (opens default app):

```powershell
npm run dev
```

```powershell
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
wait  - compiling...
event - compiled client and server successfully in 9s (125 modules)
```

![Untitled](Creating%20B%200b530/Untitled.png)

### Deleting the unwanted:

1. Not using api routes, so delete `pages/api` folder

- `index.js` is home page
- Each page in Next.js is a functional component, example:

![Untitled](Creating%20B%200b530/Untitled%201.png)

`Home` here is a functional component of react.

Anytime you create a component in `pages` folder like say `about.js` , that will allow us to go to `/about` and that component will get automatically rendered - easy routing due to Next.js

### Remove some unwanted boilerplate

![Untitled](Creating%20B%200b530/Untitled%202.png)

Keep `Head` import because we need the title of page.

![Untitled](Creating%20B%200b530/Untitled%203.png)

Delete this `class` because we will have a single global CSS file.

![Untitled](Creating%20B%200b530/Untitled%204.png)

Get rid of `main` tag and `footer` tag

Change `<title>` etc.

Final is very basic:

![Untitled](Creating%20B%200b530/Untitled%205.png)

### Add a global css

Get `global.css` from [here](https://github.com/bradtraversy/next-markdown-blog/blob/main/styles/globals.css) and add it to `styles/`

### Create a `components` folder

for components that are not pages, like `Header` etc.

> Tip: Use **ES7 react redux extension** for VSCode - do `_rfc` and it will give you a function component.

Use `rfc` to create a basic **react functional component**

Add a div with className “container”

> Tip: Enable Emmet for .js files:

---

![Untitled](Creating%20B%200b530/Untitled%206.png)

Nothing’s going to show up now, because we have not added it yet.

Now go to `_app.js` and import Header

and add the `Header` in `_app.js`

![Untitled](Creating%20B%200b530/Untitled%207.png)

Add a `<main>` tag with “container” class, and move the `Component` into the `main` tag

![Untitled](Creating%20B%200b530/Untitled%208.png)

### Create a Markdown File

index.js (HOME PAGE) is where we want to use a **data fetching method** - to fetch our Markdown posts.

The markdown posts are going to go in root in a folder called posts, so lets create that.

### Create a folder called `posts` on root.

### Create a folder `images` in public

also create `public/images/posts` to store images of your post.

### Create a frontmatter - it is always at the top

In the test md file,

![Untitled](Creating%20B%200b530/Untitled%209.png)

### Get post on homepage from md:

`getStaticProps()` allows us to fetch data **at build time** - we can use this to create static website - use this to fetch data for static website.

In `index.js`

```jsx
export async function getStaticProps() {
  // here data can even come from strapi etc.(any headless CMS)
  return {
    props: { posts: "The Posts" }, //test
  };
}
```

`getStaticProps()` makes it available in the main component: (here in Home functional component)

![Untitled](Creating%20B%200b530/Untitled%2010.png)

![Untitled](Creating%20B%200b530/Untitled%2011.png)

### Import `fs`

Although as soon as you add the import

```jsx
import fs from "fs";
```

You will see error by Next

![Untitled](Creating%20B%200b530/Untitled%2012.png)

Reason for the error is - `fs` is not something you can import on the client side. `fs` is the filesystem node.js module and we are trying to import it in client side code (react code).

**However** next.js is smart enough to know that **if you use the fs module** inside the `getStaticProps()` which will run on Server Side, then fs will work.

![Untitled](Creating%20B%200b530/Untitled%2013.png)

No more errors! :)
Even if `import fs from "fs"` is still in code, `fs` was used only inside getStaticProps() function and hence the error is no longer shown by Next.

![Untitled](Creating%20B%200b530/Untitled%2014.png)

**1** = array of all files (names?) on posts directory.

**2** = **3**, they are same.

---

### Create an array that will contain all the slugs.

~15:00 mins in [https://youtu.be/MrjeefD8sac?t=895](https://youtu.be/MrjeefD8sac?t=895)

(For now there is only 1 [test.md](http://test.md) - its slug)

![Untitled](Creating%20B%200b530/Untitled%2015.png)

![Untitled](Creating%20B%200b530/Untitled%2016.png)

### Use gray-matter

```jsx
import matter from "gray-matter";
```

in `getStaticProps()`

```jsx
// destructring - renaming the data to frontmatter.
const { data: **frontmatter** } = matter(markdownWithMeta);

return {
  slug,
  **frontmatter**,
};
```

![Untitled](Creating%20B%200b530/Untitled%2017.png)

Now return the `posts` instead of test string, from `getStaticProps()`

```jsx
return {
  props: { posts: posts },
};
```

we are logging it in component start

![Untitled](Creating%20B%200b530/Untitled%2018.png)

So for log at line 7, we see:

![Untitled](Creating%20B%200b530/Untitled%2019.png)

why array? because its result of `map()`

Also array size = no. of files. We have only 1 `test.md` :

![Untitled](Creating%20B%200b530/Untitled%2020.png)

> Notice that we dont have the body of markdown - we dont need it because we will not put it in `index.js` but will do in another component.

![Untitled](Creating%20B%200b530/Untitled%2021.png)

Add some more .md files see them getting displayed.

![Untitled](Creating%20B%200b530/Untitled%2022.png)

### Create a component for post, instead of the `h3`

![Untitled](Creating%20B%200b530/Untitled%2023.png)

Added links to Post component

It is redirecting to the URL (but getting 404 ofcourse, we dont have those pages yet).

## Need to work on inner page now.

We wants url of the blog page to be like `/blog/slug`

**Since this is a static site, we need to create these paths at build time obviously. They way we will do that with specific data fetching method called `getStaticPaths`**

We wants url of the blog page to be like `/blog/slug` and `slug` can be anything. So we have to format the pages like following, for routing:

So starting:

1. Create a new folder `blog` under `pages/`
2. Create a `js` file under blog `[slug].js`
   It is named with [ ] because we want to be dynamic.
3. Create react component in the js file - call it **PostPage**

```jsx
export default function PostPage() {
  return <div>post</div>;
}
```

1. We also want to do a couple of things

   - Obviously Fetch the data from the markdown files, for the PostPage
   - **Statically** generate these **paths** (because this is going to be a static website - and it **needs to know paths beforehand, and we need to do that based** on the data)

   Write 2 functions - `getStaticPath` and `getStaticProps`

```jsx
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

//its incomplete now
export async function getStaticProps() {
  return {
    props: {},
  };
}
```

paths logged just before return is

![Untitled](Creating%20B%200b530/Untitled%2024.png)

### Since we are returning `paths` (it has the slugs we needed) from `getStaticPaths` **we can access that in the other function `getStaticProps`**

```jsx
export async function getStaticProps({ params: { slug } }) {
  console.log(slug);
  return {
    props: {},
  };
}
```

We are able to see the log : (when page 3 was refreshed/loaded) :

![Untitled](Creating%20B%200b530/Untitled%2025.png)

So we now have direct access to whatever is the slug is, inside `getStaticProps`

### Now work on content

![Untitled](Creating%20B%200b530/Untitled%2026.png)

To see what exactly is frontmatter, `JSON.stringify` (we have see in past for the list page)

![Untitled](Creating%20B%200b530/Untitled%2027.png)

![Untitled](Creating%20B%200b530/Untitled%2028.png)

![Untitled](Creating%20B%200b530/Untitled%2029.png)

![Untitled](Creating%20B%200b530/Untitled%2030.png)

> Btw `<> </>` is called an **empty fragment**

Continued in Part 2
