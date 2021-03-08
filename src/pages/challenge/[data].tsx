import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Container } from '../../components/Container';
import styled from 'styled-components';
import { MainButtonLink } from '../../components/MainLink';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

const CentreDiv = styled.div`
  text-align: center;
`;

interface ChallengePageProps {
  data: {
    score: number;
  };
}

const ChallengePage: React.FC<ChallengePageProps> = ({ data }) => (
  <Layout>
    <SEO title={`The Rebigulator | Simpsons Trivia Game`} />
    <Container>
      <CentreDiv>
        <h1>Think you can beat a score of {data.score}?</h1>
        <h2>
          <Link href="/">
            <MainButtonLink>Get started here</MainButtonLink>
          </Link>
        </h2>
      </CentreDiv>
    </Container>
  </Layout>
);

export const getStaticProps: GetStaticProps<{}, { data: string }> = async ({
  params,
}) => {
  const { data } = params!;

  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  let parsedData = undefined;

  try {
    parsedData = JSON.parse(Buffer.from(data, 'base64').toString());
  } catch (ignored) {
    console.log(ignored);
    return {
      notFound: true,
    };
  }

  console.log(parsedData);

  if (!parsedData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: parsedData,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ChallengePage;
