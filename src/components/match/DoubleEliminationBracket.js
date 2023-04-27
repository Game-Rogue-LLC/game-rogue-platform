import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

const DoubleElimination = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.DoubleEliminationBracket), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const Match = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.Match), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const DoubleEliminationBracket = (props) => {
  const { options, matches, handlePartyClick, handleMatchClick } = props;

  return (
    matches &&
    <DoubleElimination
      options={{
        style: {
          roundHeader: {
            backgroundColor: '#180e05',
            fontColor: '#fff',
          },
          // connectorColor: '#CED1F2',
          // connectorColorHighlight: '#da96c6',
          // wonBywalkOverText: '#00ff00'
        },
        ...options
      }}
      matches={matches}
      matchComponent={((props) => {
        if (handleMatchClick) {
          props = {
            ...props,
            onMatchClick: (props) => handleMatchClick(props.match)
          }
        }
        if (handlePartyClick) {
          props = {
            ...props,
            onPartyClick: (party, partyWon) => handlePartyClick(party, partyWon)
          }
        }

        return (
          <Match {...props}
            topText={dayjs(props.match.start).format("M.DD. hh:mm") + ' - ' + dayjs(props.match.end).format("M.DD. hh:mm")}
          />
        )
      })}
    />
  )
}

export default DoubleEliminationBracket;