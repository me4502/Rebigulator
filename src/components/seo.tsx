/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Head from 'next/head';
import type { FC } from 'react';

export interface SEOImageProps {
  height?: number;
  url: string;
  width?: number;
  alt?: string;
}

export interface SEOPropTypes {
  description?: string;
  image?: SEOImageProps;
  title: string;
  type?: string;
}

export function createImageMeta(
  image?: SEOImageProps
): { content: string; property: string }[] {
  if (image) {
    const items = [
      {
        property: `og:image`,
        content: image.url,
      },
    ];

    for (const key of ['width', 'height'] as (keyof SEOImageProps)[]) {
      if (image[key]) {
        items.push({
          property: `og:image:${key}`,
          content: `${image[key]}`,
        });
      }
    }

    return items;
  } else {
    return [];
  }
}

const DEFAULT_IMAGE = {
  url: `https://rebigulator.org/logo.png`,
  width: 512,
  height: 512,
};

export const SEO: FC<SEOPropTypes> = ({
  description,
  title,
  type = 'website',
  image = DEFAULT_IMAGE,
}) => {
  const metaDescription =
    description || 'A Frinkiac-Powered Simpsons trivia game.';

  return (
    <Head>
      <title>{`${title} | Rebigulator`}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta property="og:title" content={title} key="title" />
      <meta
        property="og:description"
        content={metaDescription}
        key="og:description"
      />
      <meta property="og:type" content={type} key="og:type" />
      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta
        name="twitter:creator"
        content="@the_me4502"
        key="twitter:creator"
      />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={metaDescription}
        key="twitter:description"
      />
      {createImageMeta(image).map((item) => (
        <meta
          property={item.property}
          content={item.content}
          key={item.property}
        />
      ))}
    </Head>
  );
};

export default SEO;
