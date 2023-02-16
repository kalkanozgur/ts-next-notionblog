import { GetStaticProps } from 'next';
import Link from 'next/link';
import * as React from 'react';

import { getAllPublishedPosts } from '@/lib/notion';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function IndexPage({ posts }: any) {
  if (!posts) return <h1>No Posts</h1>;
  return (
    <Layout>
      <Seo templateTitle='Index' />

      <main className='bg-dark'>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <h1 className='text-4xl font-bold text-white'>Blog</h1>
            {/* <p className='text-white'>{JSON.stringify(posts)}</p> */}
            {posts.map((post: any) => (
              <section key={post.id}>
                <Link href={`/posts/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.date}</p>
                <p>{post.description}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getAllPublishedPosts();

  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};
