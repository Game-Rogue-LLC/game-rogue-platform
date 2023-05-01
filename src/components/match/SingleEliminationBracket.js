import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

const SingleElimination = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.SingleEliminationBracket), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const Match = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.Match), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const SingleEliminationBracket = ({ options, matches, handlePartyClick, handleMatchClick }) => {

  return (
    matches && matches.length > 0 &&
    <SingleElimination
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
            topText={dayjs(props.match.start).format("MMM. DD") + ' - ' + dayjs(props.match.end).format("MMM. DD")}
          />
        )
      })}
    />
  )
}

export default SingleEliminationBracket;