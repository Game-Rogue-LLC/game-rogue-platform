import dynamic from 'next/dynamic'

const SingleElimination = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.SingleEliminationBracket), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const Match = dynamic(() => import('@g-loot/react-tournament-brackets').then((mod) => mod.Match), {
  ssr: false, // This ensures the component is only rendered on the client-side
  loading: () => <p>Loading...</p>
});

const SingleEliminationBracket = (props) => {
  const { options, matches, handlePartyClick } = props;

  console.log(matches)

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
      matchComponent={((props) => (
        <Match {...props}
          onPartyClick={(party, partyWon) => handlePartyClick(party, partyWon)}
        />
      ))}
    />
  )
}

export default SingleEliminationBracket;