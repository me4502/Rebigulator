import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const MainLinkStyle = css`
  color: #1587cf;
  text-decoration: none;

  :hover {
    text-shadow: 0px 0px 1px #1587cf;
  }
`;

export const MainLink = styled(Link)`
  ${MainLinkStyle}
`;

export const MainOutboundLink = styled(OutboundLink)`
  ${MainLinkStyle}
`;

const MainButtonStyle = css``;

export const MainButton = styled.div`
  cursor: pointer;
  ${MainButtonStyle}
`;

export const MainButtonLink = styled(Link)`
  ${MainButtonStyle}
`;
