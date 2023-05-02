import ScoresDialog from "@/src/components/dialog/ScoresDialog";

const MatchDialog = ({ title, open, onSave, status, onClose, match, team1, team2, score1, score2, onScore1Change, onScore2Change }) => {
  // if (status == 0) {
  //   const { start, end, onStartChange, onEndChange } = props;
  //   return (
  //     <DatePickDialog title={title} open={open} start={start} end={end} onStartChange={onStartChange} onEndChange={onEndChange} onSave={onSave} onClose={onClose} />
  //   )
  // } else 
  if (status == 0) {
    return (
      <ScoresDialog title={title} open={open} team1={team1} team2={team2} score1={score1} score2={score2} onScore1Change={onScore1Change}
        onScore2Change={onScore2Change} onSave={onSave} onClose={onClose} editable={true} />
    )
  }

  return (
    <ScoresDialog title={title} open={open} team1={team1} team2={team2} score1={score1} score2={score2} onClose={onClose} />
  )
}

export default MatchDialog;