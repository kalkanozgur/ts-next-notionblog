import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { getAllPublishedPosts, getSinglePostBySlug } from '@/lib/notion';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function BlogPage({ post }: any) {
  return (
    <Layout>
      <Seo templateTitle='Blog' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            {post && (
              <>
                <h1 className='text-4xl font-bold text-white'>
                  {post.metadata.title}
                </h1>
                <p className='text-white'>{post.metadata.date}</p>
                <p className='text-white'>{post.metadata.tags.join(', ')}</p>
                <ReactMarkdown>{post.markdown}</ReactMarkdown>
              </>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getSinglePostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPublishedPosts();
  const paths = posts.map(({ slug }: any) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};
