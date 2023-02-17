import Link from 'next/link';
import React from 'react';

type Props = {
  post: {
    id: string;
    slug: string;
    title: string;
    date: string;
    description: string;
  };
};

const PostItem = ({ post }: Props) => {
  return (
    <>
      <section
        key={post.id}
        className='m-3 rounded-lg bg-dark p-5 duration-300 hover:bg-dark/80 hover:transition-all'
      >
        <Link href={`/posts/${post.slug}`}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.description}</p>
        </Link>
      </section>
    </>
  );
};

export default PostItem;
