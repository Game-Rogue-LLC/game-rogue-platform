import dynamic from "next/dynamic";
import { useState } from "react";

const MatchComponent = dynamic(
  () => import("@/src/components/tournament-bracket/MatchComponent").then((mod) => mod),
  {
    ssr: false, // This ensures the component is only rendered on the client-side
    loading: () => <p>Loading...</p>
  }
);

const Match = ({ item, onMatchClick, onPartyClick }) => {
  const [bottomHovered, setBottomHovered] = useState(false);
  const [topHovered, setTopHovered] = useState(false);

  return (
    <MatchComponent
      onMatchClick={onMatchClick}
      onMouseEnter={(id) => {
        if (id === item.participants[1].id) {
          setBottomHovered(true);
          setTopHovered(false);
        } else if (id === item.participants[0].id) {
          setTopHovered(true);
          setBottomHovered(false);
        }
      }}
      onMouseLeave={() => {
        setBottomHovered(false);
        setTopHovered(false);
      }}
      onPartyClick={onPartyClick}
      bottomHovered={bottomHovered}
      bottomParty={item.participants[1]}
      // bottomText={item.participants[1]?.name}
      // bottomWon={item.participants[1]?.isWin}
      match={item}
      topHovered={topHovered}
      topParty={item.participants[0]}
      // topText={item.participants[0]?.name}
      // topWon={item.participants[0]?.isWin}
    />
  );
};

export default Match;
