import { useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  Chip
} from '@mui/material'
import dayjs from 'dayjs';
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';
import { useTournamentContext } from '@/src/context/TournamentContext';
import TeamItem from '@/src/components/item/TeamItem';
import GameChip from '@/src/components/chip/GameChip';
import PlatformChip from '@/src/components/chip/PlatformChip';
import RegionChip from '@/src/components/chip/RegionChip';

const MatchCard = ({ item }) => {
  const { event, team, currentTime } = useTournamentContext();

  const getStatus = (start, curTime) => {
    if (dayjs(start).isSame(curTime, 'day')) return dayjs(start).format("HH:mmZ[Z]");
    if (dayjs(start).diff(curTime, 'day') == 1) return "TOMORROW";
    return dayjs(start).format("DD.MMM.YYYY");
  }

  return (
    <Link href={`/match/${item?.id}/info`}>
      <Box
        sx={{
          border: 'solid 1px rgba(255, 255, 255, 0.2)',
          minHeight: '280px',
          background: 'black',
          ':hover': {
            cursor: 'pointer',
            background: 'rgba(245, 131, 31, 0.1)'
          }
        }}
      >
        <Box
          sx={{
            height: '70px',
            background: 'url(' + (event?.events[item?.eid]?.banner || DEFAULT_CONTENTBLOCK_IMAGE) + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottom: 'solid 1px gray',
            p: 1,
            alignItems: 'center',
            display: 'flex',
            gap: 1
          }}
        >
          <GameChip />
          <PlatformChip type={event?.events[item?.eid]?.platform} />
          <RegionChip type={event?.events[item?.eid]?.region} />
        </Box>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={event?.events[item?.eid]?.darkLogo || DEFAULT_LOGO} style={{ height: '40px', width: '40px', objectFit: 'cover' }} />
          <Typography variant='h4' fontSize={24} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
            {event?.events[item?.eid]?.name}
          </Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Chip label={getStatus(item?.start, currentTime)} sx={{ backgroundColor: '#393D40', color: 'white', textTransform: 'uppercase' }} />
        </Box>
        <Box sx={{ p: 2, background: 'transparent' }}>
          <Grid container sx={{ border: 'solid 1px #6a1f0d' }}>
            <Grid item sx={{ width: '40px', backgroundColor: '#6a1f0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6'>VS</Typography>
            </Grid>
            <Grid item xs>
              <TeamItem team={team?.teams[item?.participants[0].id]} sx={{ pl: 1, py: 0.5, justifyContent: 'left', borderBottom: 'solid 1px #6a1f0db5' }} disableLink />
              <TeamItem team={team?.teams[item?.participants[1].id]} sx={{ pl: 1, py: 0.5, justifyContent: 'left' }} disableLink />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  )
}

export default MatchCard;