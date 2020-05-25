import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

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

const MainButtonStyle = css`
  border-radius: 2px;
  background-color: #1587cf;
  color: #fff;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.6rem;
  cursor: pointer;
  border: none;
  word-break: keep-all;
  box-shadow: none;
  text-decoration: none;
  font-weight: 600;

  :hover,
  :active,
  :focus,
  &.active {
    background-color: #1587cf;
    color: #fff;
    box-shadow: 0 3px 5px 0px #1587cf66;
  }
`;

export const MainButton = styled.div`
  cursor: pointer;
  ${MainButtonStyle}
`;

export const MainButtonLink = styled(Link)`
  ${MainButtonStyle}
`;
