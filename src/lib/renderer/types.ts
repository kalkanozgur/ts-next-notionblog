//#region Notion Block Types
export type Block = {
  object: 'block';
  id: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  paragraph?: Paragraph;
  heading_1?: Heading1;
  heading_2?: Heading2;
  heading_3?: Heading3;
  bulleted_list_item?: BulletedListItem;
  numbered_list_item?: NumberedListItem;
  to_do?: ToDo;
  toggle?: Toggle;
  image?: Image;
  embed?: Embed;
  unsupported?: Unsupported;
};
export type Paragraph = {
  rich_text: RichText[];
  children?: Block[];
};
export type Heading1 = {
  rich_text: RichText[];
  children?: Block[];
};
export type Heading2 = {
  rich_text: RichText[];
  children?: Block[];
};
export type Heading3 = {
  rich_text: RichText[];
  children?: Block[];
};
export type BulletedListItem = {
  text: RichText[];
  children?: Block[];
};
export type NumberedListItem = {
  text: RichText[];
  children?: Block[];
};
export type ToDo = {
  text: RichText[];
  checked: boolean;
  children?: Block[];
};
export type Toggle = {
  text: RichText[];
  children?: Block[];
};
export type Image = {
  type: string;
  caption: RichText[];
  file: ImageFile;
  children?: Block[];
};
export type Embed = {
  type: string;
  caption: RichText[];
  children?: Block[];
  url?: string;
};
export type Unsupported = {
  children?: Block[];
};

export type ImageFile = {
  url: string;
  width: number;
  height: number;
};

export type RichText = {
  type: string;
  text: {
    content: string;
    link?: Link;
  }[];
  annotations: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  plain_text: string;
  href?: string;
};

export type Link = {
  type: string;
  url: string;
};
//#endregion
