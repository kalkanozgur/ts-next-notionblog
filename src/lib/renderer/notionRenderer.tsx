//#region Renderer for notion blocks
import Image from 'next/image';
import React from 'react';

import { Block } from './types';

export const renderBlock = (block: Block) => {
  switch (block.type) {
    case 'paragraph':
      return <p key={block.id}>{block.paragraph?.rich_text[0]?.plain_text}</p>;
    case 'heading_1':
      return (
        <h1 key={block.id}>{block.heading_1?.rich_text[0]?.plain_text}</h1>
      );
    case 'heading_2':
      return (
        <h2 key={block.id}>{block.heading_2?.rich_text[0]?.plain_text}</h2>
      );
    case 'heading_3':
      return (
        <h3 key={block.id}>{block.heading_3?.rich_text[0]?.plain_text}</h3>
      );
    case 'bulleted_list_item':
      return (
        <ul>
          <li key={block.id} style={{ listStyleType: 'circle' }}>
            {block.bulleted_list_item?.rich_text[0].plain_text}
          </li>
        </ul>
      );
    case 'numbered_list_item':
      return (
        <ol>
          <li key={block.id}>
            {block.numbered_list_item?.rich_text[0]?.plain_text}
          </li>
        </ol>
      );
    case 'to_do':
      return (
        <div key={block.id}>
          <input type='checkbox' checked={block.to_do?.checked} />
          {block.to_do?.rich_text[0].plain_text}
        </div>
      );
    case 'toggle':
      return (
        <details key={block.id}>
          <summary>{block.toggle?.rich_text[0]?.plain_text}</summary>

          {block.toggle?.children?.map((child) => renderBlock(child))}
        </details>
      );
    case 'image':
      return (
        <div key={block.id}>
          <Image
            src={block.image?.file.url as string}
            alt={block.image?.caption[0].plain_text as string}
            width={block.image?.file?.width}
            height={block.image?.file?.height}
          />
        </div>
      );
    case 'embed':
      return (
        <div key={block.id}>
          <iframe src={block.embed?.url} allowFullScreen />
        </div>
      );
    default:
      return <div key={block.id}>{block.type}</div>;
  }
};

export const notionRenderer = ({ blocks }: { blocks: Block[] }) => {
  return (
    <>
      {blocks.map((block) => {
        return renderBlock(block);
      })}
    </>
  );
};
