import {
  Anchor,
  BottomText,
  Line,
  Score,
  Side,
  StyledMatch,
  Team,
  TopText,
  Wrapper
} from "./styles";

import React from "react";

function Match({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon
}) {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TopText>{topText}</TopText>
        {match && (match.href || typeof onMatchClick === "function") && (
          <Anchor
            href={match.href}
            onClick={(event) => onMatchClick?.({ match, topWon, bottomWon, event })}
          >
            <TopText>Match Details</TopText>
          </Anchor>
        )}
      </div>
      <StyledMatch>
        <Side
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          won={topWon}
          hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>{topParty?.name}</Team>
          <Score won={topWon}>{topParty?.resultText}</Score>
        </Side>
        <Line highlighted={topHovered || bottomHovered} />
        <Side
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          won={bottomWon}
          hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>{bottomParty?.name}</Team>
          <Score won={bottomWon}>{bottomParty?.resultText}</Score>
        </Side>
      </StyledMatch>
      <BottomText>{bottomText ?? " "}</BottomText>
    </Wrapper>
  );
}

export default Match;
