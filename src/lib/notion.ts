import { Client } from '@notionhq/client';

export interface PostMetaData {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
}

const client = new Client({
  auth: process.env.NOTION_KEY,
});

export const getAllPublishedPosts = async () => {
  const posts = await client.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  const allPosts = posts.results;
  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

export const getSinglePostBySlug = async (slug: string) => {
  const response = await client.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const post = response.results[0];
  const metadata = getPageMetaData(post);
  const blocks = await client.blocks.children.list({
    block_id: post.id,
  });

  return { metadata, blocks };
};

/* #region  /**=========== Helper functions =========== */
const getPageMetaData = (post: any) => {
  return {
    id: post.id as string,
    title: post.properties.Name.title[0].plain_text as string,
    slug: post.properties.Slug.rich_text[0].plain_text as string,
    description: post.properties.Description.rich_text[0].plain_text as string,

    date: getDate(post.properties.Date.date.start),
    tags: post.properties.Tags.multi_select.map(
      (tag: any) => tag.name as string
    ),
  };
};

function getDate(datestring: string) {
  const date = new Date(datestring);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
}
/* #endregion  /**=========== Helper functions =========== */
