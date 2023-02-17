import { GetStaticProps } from 'next';
import * as React from 'react';

import { getAllPublishedPosts, PostMetaData } from '@/lib/notion';

import Layout from '@/components/layout/Layout';
import { PostItem } from '@/components/postItem';
import Seo from '@/components/Seo';

export default function IndexPage({ posts }: any) {
  if (!posts) return <h1>No Posts</h1>;
  return (
    <Layout>
      <Seo templateTitle='Index' />

      <main className=''>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <h1 className='text-4xl font-bold text-white'>Blog</h1>
            {/* <p className='text-white'>{JSON.stringify(posts)}</p> */}
            {posts.map((post: PostMetaData) => (
              <PostItem key={post.slug} post={post} />
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
