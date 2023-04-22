import { useEffect, useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import {
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Paper,
  useTheme,
  Typography,
  TextField,
  Alert,
  OutlinedInput,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { STAFF_ROLES } from '@/src/config/global';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { useAuthContext } from '@/src/context/AuthContext';
import Validator from 'validatorjs';
import { LoadingButton } from '@mui/lab';

const initialInputs = {
  tid: ''
}

const rules = {
  tid: 'required'
}

const customMessages = {
  'required.tid': 'Team ID is required.'
}

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organization, team, event } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (router?.query.event) {
      const newEID = router.query.event;
      event.setCurrent(newEID);
      organization.setCurrent(event.events[newEID].oid);
    }
  }, [router])

  useEffect(() => {
    setTitle('ADD A PARTICIPANT');
  }, [])

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    if (!Object.keys(team.teams).includes(data.tid)) {
      setErrors({
        tid: 'Team with the id does not exist.'
      })
      return false;
    }
    setErrors({});
    return true;
  }

  const handle = {
    create: async (e) => {
      // if (event.events[event.current].participants?.length >= event.events[event.current].participantsCount) {
      //   alert('You can\'t add more than ' + event.events[event.current].participantsCount + ' participants');
      //   return;
      // }
      if (validate(inputs, rules, customMessages) === false)
        return;
      if (event.events[event.current].participants?.findIndex(val => val.tid === inputs.tid) >= 0) {
        alert('This team is already registered.');
        return;
      }
      setSaving(true);
      let newParticipants = event.events[event.current]?.participants;
      if (!newParticipants) newParticipants = [];
      newParticipants = [
        ...newParticipants,
        {
          tid: inputs.tid,
          deleted: false,
          registeredAt: new Date()
        }
      ]

      const res = await event.update(event.current, { participants: newParticipants });

      if (res.code === 'succeed') {
        router.push('/participant?event=' + event.current);
      } else if (res.code === 'failed') {
        console.error(res.message)
      }

      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === 'number') value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      })
    }
  }

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Box>
        <FormControl fullWidth error={errors.tid !== undefined}>
          <OutlinedInput id="team-id" name="tid" value={inputs.tid} aria-describedby="team-id-helper"
            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
          {errors.tid !== undefined && <FormHelperText id="team-id-helper" sx={{ mt: 2 }}>{errors.tid}</FormHelperText>}
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          loading={saving}
          variant='contained'
          onClick={handle.create}
        >
          ADD
        </LoadingButton>
      </Box>
    </Paper>
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
