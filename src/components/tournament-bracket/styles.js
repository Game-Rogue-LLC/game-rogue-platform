import styled, { css } from "styled-components";

import theme from "@/src/components/tournament-bracket/themes/themes";

const primaryColor = "#180e05";

export default () => {
  return <>Style</>;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  font-family: ${() => theme.fontFamily};
`;
export const TopText = styled.p`
  color: ${() => theme.textColor.dark};
  margin-bottom: 0.2rem;
  min-height: 1.25rem;
`;
export const BottomText = styled.p`
  color: ${() => theme.textColor.dark};
  flex: 0 0 none;
  text-align: center;
  margin-top: 0.2rem;
  min-height: 1.25rem;
`;
export const StyledMatch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`;

export const Team = styled.div``;

export const Score = styled.div`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  align-items: center;
  width: 20%;
  justify-content: center;
  background: ${() => theme.score.background.lostColor};
  color: ${theme.textColor.dark};
`;
export const Side = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  background: ${theme.matchBackground.lostColor};
  :first-of-type {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-top-width: 2px;
  }
  :last-of-type {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-width: 2px;
  }
  border-right: 4px solid
    ${({ hovered }) => (hovered ? theme.border.highlightedColor : theme.border.color)};
  border-left: 4px solid
    ${({ hovered }) => (hovered ? theme.border.highlightedColor : theme.border.color)};
  border-top: 1px solid
    ${({ hovered }) => (hovered ? theme.border.highlightedColor : theme.border.color)};
  border-bottom: 1px solid
    ${({ hovered }) => (hovered ? theme.border.highlightedColor : theme.border.color)};
  transition: border-color 0.5s ${theme.transitionTimingFunction};
  ${Team} {
    color: ${theme.textColor.dark};
  }
  ${Score} {
    color: ${theme.textColor.dark};
  }
`;

export const Line = styled.div`
  height: 1px;
  transition: border-color 0.5s ${({ theme }) => theme.smooth};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.border.color};
`;

export const Anchor = styled.a`
  font-family: ${theme.fontFamily};
  font-weight: ${"700"};
  color: ${theme.textColor.main};
  font-size: ${"1rem"};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
