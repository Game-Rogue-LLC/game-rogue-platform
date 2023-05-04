import {
  MenuList,
  MenuItem,
  useTheme
} from '@mui/material'
import TeamItem from '@/src/components/item/TeamItem';

const TeamList = ({ teams, myTeam }) => {
  const theme = useTheme();
  return (
    <MenuList
      sx={{
        border: 'solid 1px rgba(255, 255, 255, 0.2)',
        padding: 0
      }}
    >
      {
        teams.map((item, i) => {
          return (
            <MenuItem
              key={'team_' + item.id}
              disableRipple
            // onClick={(e) => {
            //   router.push('/team/' + item.id);
            // }}
            >
              <TeamItem team={item} sx={{ color: (item.id == myTeam ? theme.palette.primary.main : 'white') }} />&nbsp;
              {/* <Typography variant='b1' style={{ color: (item.id == myTeam ? theme.palette.primary.main : 'white') }}>
              {item.id == myTeam ? '( My Team )' : ''}
            </Typography> */}
            </MenuItem>
          )
        })
      }
    </MenuList>
  )
}

export default TeamList;