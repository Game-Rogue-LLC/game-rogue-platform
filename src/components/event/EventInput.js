import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  TextField,
} from '@mui/material'
import { Edit } from '@mui/icons-material';
import DateTimePicker from '@/src/components/DateTimePicker'
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';
import { useTournamentContext } from '@/src/context/TournamentContext';

const EventInput = (props) => {
  const { organization } = useTournamentContext();
  const { handle, inputs, disabled, errors } = props;
  return (
    <Grid container spacing={2} rowSpacing={4}>
      <Grid item xs={12}>

        <Box display={'flex'} justifyContent={'center'} gap={4} alignItems={'center'} mt={2}>
          <Box display={'flex'} justifyContent={'center'} gap={2}>
            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'baseline'}>
              <Button variant='contained' component='label' disabled={disabled}>
                UPLOAD DARK LOGO
                <input type="file" accept="image/*" name="upload-dark-logo" id="upload-dark-logo" hidden onChange={(e) => handle.upload(e, 'darkLogo')} />
              </Button>
              <Button variant='contained' component='label' disabled={disabled} onClick={handle.removeDarkLogo}>
                REMOVE DARK LOGO
              </Button>
            </Box>
            <Box width={'200px'} height={'200px'} textAlign={'center'}>
              <img src={inputs.darkLogo || DEFAULT_LOGO} style={{ height: '200px', maxWidth: '200px', objectFit: 'contain' }} />
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'center'} gap={2}>
            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'baseline'}>
              <Button variant='contained' component='label' disabled={disabled}>
                UPLOAD LIGHT LOGO
                <input type="file" accept="image/*" name="upload-light-logo" id="upload-light-logo" hidden onChange={(e) => handle.upload(e, 'lightLogo')} />
              </Button>
              <Button variant='contained' component='label' disabled={disabled} onClick={handle.removeLightLogo}>
                REMOVE LIGHT LOGO
              </Button>
            </Box>
            <Box width={'200px'} height={'200px'} textAlign={'center'}>
              <img src={inputs.lightLogo || DEFAULT_LOGO} style={{ height: '200px', maxWidth: '200px', objectFit: 'contain' }} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', position: 'relative', mt: 3 }}>
          <IconButton sx={{ position: 'absolute', right: 0, bottom: 0 }} component='label' disabled={disabled}>
            <Edit />
            <input type="file" accept="image/*" name="upload-banner" id="upload-banner" hidden onChange={(e) => handle.upload(e, 'banner')} />
          </IconButton>
          <img src={inputs?.banner || DEFAULT_CONTENTBLOCK_IMAGE} style={{ height: '200px', maxWidth: '600px', objectFit: 'cover', border: 'solid 1px rgba(255, 255, 255, 0.2)', borderRadius: '4px' }} />
        </Box>

      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>Organization</Typography>
        <Select
          labelId="organization-select-label"
          id="organization-select"
          value={inputs?.oid}
          onChange={handle.inputs}
          variant="outlined"
          name="oid"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          {Object.keys(organization.organizations).map((key, i) => {
            const item = organization.organizations[key];
            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          })}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography variant='h6'>Event Name</Typography>
          <FormControl sx={{ mt: 1 }} fullWidth error={errors.name !== undefined}>
            <OutlinedInput id="event-name" name="name" aria-describedby="event-name-helper" value={inputs?.name} disabled={disabled}
              onChange={handle.inputs} />
            {errors.name !== undefined && <FormHelperText id="event-name-helper" sx={{ mt: 2 }}>{errors.name}</FormHelperText>}
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h6'>Event Description</Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <TextField multiline id="event-description" name="description" aria-describedby="event-description-helper" value={inputs?.description} disabled={disabled}
              onChange={handle.inputs} />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant='h6'>Event Format</Typography>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={inputs?.category}
          name="category"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='tournament' value={0}>Tournament</MenuItem>
          <MenuItem key='league' value={1}>League</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant='h6'>Game Type</Typography>
        <Box sx={{ mt: 1 }}>
          {
            inputs?.category == 0
              ?
              <Select
                labelId="format-select-label"
                id="format-select"
                value={inputs?.format}
                name="format"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key='single-elimination' value={0}>Single Elimination</MenuItem>
                <MenuItem key='double-elimination' value={1}>Double Elimination</MenuItem>
                <MenuItem key='ladder-elimination' value={2}>Ladder Elimination</MenuItem>
                <MenuItem key='pyramid-elimination' value={3}>Pyramid Elimination</MenuItem>
              </Select>
              :
              <Select
                labelId="format-select"
                id="format-select-temp"
                value={inputs?.format}
                name="format"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key='straight-round-robin' value={4}>Straight Round Robin</MenuItem>
                <MenuItem key='round-robin-double-split' value={5}>Round Robin Double Split</MenuItem>
                <MenuItem key='round-robin-triple-split' value={6}>Round Robin Triple Split</MenuItem>
                <MenuItem key='round-robin-quadruple-split' value={7}>Round Robin Quadruple Split</MenuItem>
                <MenuItem key='semi-round-robin' value={8}>Semi Round Robin</MenuItem>
              </Select>
          }
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant='h6'>Event Seed</Typography>
        <Select
          labelId="seed-select-label"
          id="seed-select"
          value={inputs?.seed}
          name="seed"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='manual' value={0}>Manual</MenuItem>
          <MenuItem key='random' value={1}>Random</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant='h6'>Participants</Typography>
        <FormControl sx={{ mt: 1 }} fullWidth error={errors.participantsCount !== undefined}>
          <OutlinedInput id="participants-count" name="participantsCount" aria-describedby="participants-count-helper" value={inputs?.participantsCount} disabled={disabled}
            type='number' onChange={handle.inputs} />
          {errors.participantsCount !== undefined && <FormHelperText id="participants-count-helper" sx={{ mt: 2 }}>{errors.participantsCount}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Typography variant='h6'>Start Date</Typography>
        <DateTimePicker value={inputs?.startAt} setValue={(newDate) => handle.setDate('startAt', newDate)} sx={{ mt: 1, width: '100%' }} disabled={disabled} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Typography variant='h6'>Register Date</Typography>
        <DateTimePicker value={inputs?.registerTo} setValue={(newDate) => handle.setDate('registerTo', newDate)} sx={{ mt: 1, width: '100%' }} disabled={disabled} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Typography variant='h6'>CheckIn</Typography>
        <FormControl sx={{ mt: 1 }} fullWidth error={errors.checkin !== undefined}>
          <OutlinedInput id="check-in" name="checkin" aria-describedby="check-in-helper" value={inputs?.checkin} disabled={disabled}
            type='number' onChange={handle.inputs} />
          {errors.checkin !== undefined && <FormHelperText id="check-in-helper" sx={{ mt: 2 }}>{errors.checkin}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h6'>Game</Typography>
        <Select
          labelId="game-select-label"
          id="game-select"
          value={inputs?.game}
          name="game"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='rainbow-six-siege' value={0}>Rainbow Six Siege</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h6'>Platform</Typography>
        <Select
          labelId="platform-select-label"
          id="platform-select"
          value={inputs?.platform}
          name="platform"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='pc' value={0}>PC</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h6'>Region</Typography>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={inputs?.region}
          name="region"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='north-american' value={0}>North American</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h6'>Time Zone</Typography>
        <Select
          labelId="timezone-select-label"
          id="timezone-select"
          value={inputs?.timezone}
          name="timezone"
          onChange={handle.inputs}
          variant="outlined"
          disabled={disabled}
          sx={{ mt: 1 }}
          fullWidth
        >
          <MenuItem key='ast' value={0}>Atlantic Standard Time (AST)</MenuItem>
          <MenuItem key='est' value={1}>Eastern Standard Time (EST)</MenuItem>
          <MenuItem key='cst' value={2}>Central Standard Time (CST)</MenuItem>
          <MenuItem key='mst' value={3}>Mountain Standard Time (MST)</MenuItem>
          <MenuItem key='pst' value={4}>Pacific Standard Time (PST)</MenuItem>
          <MenuItem key='akst' value={5}>Alaskan Standard Time (AKST)</MenuItem>
        </Select>
      </Grid>
      {/** PLACE SCHEDULE HERE */}
      <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h6'>Add a Rulebook</Typography>
          <Typography variant='subtitle2'>Publicly shared (.pdf) and must be accepted by competitors.</Typography>
        </Box>
        <Box>
          <Typography variant='body2' align='center'>{inputs?.rulebook}</Typography>
          <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
            + Upload
            <input type="file" accept=".pdf" name="upload-rulebook" id="upload-rulebook" hidden onChange={(e) => handle.upload(e, 'rulebook')} />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h6'>Add Terms and Conditions</Typography>
          <Typography variant='subtitle2'>Must be accepted by competitors and is displayed alongside rulebooks.</Typography>
        </Box>
        <Box>
          <Typography variant='body2' align='center'>{inputs?.terms}</Typography>
          <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
            + Upload
            <input type="file" accept=".pdf" name="upload-terms" id="upload-terms" hidden onChange={(e) => handle.upload(e, 'terms')} />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h6'>Add Privacy Policy</Typography>
          <Typography variant='subtitle2'>Must be accepted by competitors and is displayed alongside rulebooks and terms and conditions.</Typography>
        </Box>
        <Box>
          <Typography variant='body2' align='center'>{inputs?.privacy}</Typography>
          <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
            + Upload
            <input type="file" accept=".pdf" name="upload-privacy" id="upload-privacy" hidden onChange={(e) => handle.upload(e, 'privacy')} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default EventInput;