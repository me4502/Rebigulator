/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOImageProps {
  height?: number;
  url: string;
  width?: number;
}

export interface SEOPropTypes {
  description?: string;
  lang?: string;
  image?: SEOImageProps;
  keywords?: string[];
  // tslint:disable-next-line:no-any
  meta?: any[];
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

export const SEO: React.FC<SEOPropTypes> = ({
  description,
  lang = 'en',
  meta = [],
  title,
  keywords = [],
  type = 'website',
  image,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(createImageMeta(image))
        .concat(meta)}
    />
  );
};

export default SEO;
