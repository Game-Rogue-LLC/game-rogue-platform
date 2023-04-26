import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  TextField,
  Paper,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Validator from 'validatorjs';

import { Edit } from '@mui/icons-material';
import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import DateTimePicker from '@/src/components/DateTimePicker';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { DEFAULT_LOGO, DEFAULT_CONTENTBLOCK_IMAGE } from '@/src/config/global';
import EventInput from '@/src/components/event/EventInput';

const initialInputs = {
  name: '',
  banner: DEFAULT_CONTENTBLOCK_IMAGE,
  darkLogo: DEFAULT_LOGO,
  lightLogo: DEFAULT_LOGO,
  oid: '',
  category: 0, // league or tournament
  format: 0, // single, double, round robin ...
  seed: 0,
  startAt: new Date(),
  registerTo: new Date(),
  game: 0,
  platform: 0,
  region: 0,
  timezone: 0,
  rulebook: '',
  terms: '',
  privacy: '',
  checkin: 15,
  description: '',
  participantsCount: 2,
  status: 0,
  deleted: false
}

const rules = {
  name: 'required',
  checkin: 'required'
}

const customMessages = {
  'required.name': 'Event Name is required.',
  'required.checkin': 'CheckIn is required.'
}

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const [eid, setEID] = useState(null);
  const { setTitle } = useAppContext();
  const { organization, event } = useTournamentContext();
  const [saving, setSaving] = useState(false);
  const [rulebook, setRulebook] = useState(null);
  const [terms, setTerms] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [banner, setBanner] = useState(null);
  const [inputs, setInputs] = useState({ ...initialInputs })
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);

  useEffect(() => {
    setTitle('EDIT EVENT');
  }, [])

  useEffect(() => {
    if (router?.query?.eid) {
      setEID(router.query.eid);
    }
  }, [router])

  useEffect(() => {
    if (event?.events[eid]) {
      event.setCurrent(eid);
      organization.setCurrent(event.events[eid]?.oid);
      setInputs({
        ...event.events[eid]
      })
    }
  }, [eid, event])

  const validate = (data, rule, messages) => {

    if (data.participantsCount % 2) {
      setErrors(prev => ({
        ...prev,
        participantsCount: 'Participant Count must be even number.'
      }))
    }

    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(prev => ({
        ...prev,
        ...validator.errors.errors
      }));
      return false;
    }

    if (data.participantsCount % 2) return false;
    setErrors({});
    return true;
  }

  const handle = {
    save: async (e) => {
      if (validate(inputs, rules, customMessages) === false) {
        return;
      }
      let newEvent = { ...inputs };
      let uploaded = true;
      setSaving(true)

      if (banner) {
        uploaded = false;
        const res = await event.upload(banner, eid, 'banner');
        if (res.code === 'succeed') {
          newEvent.banner = res.url;
          uploaded = true;
        }
      }
      if (darkLogo) {
        uploaded = false;
        const res = await event.upload(darkLogo, eid, 'darkLogo');
        if (res.code === 'succeed') {
          newEvent.darkLogo = res.url;
          uploaded = true;
        }
      }
      if (lightLogo) {
        uploaded = false;
        const res = await event.upload(lightLogo, eid, 'lightLogo');
        if (res.code === 'succeed') {
          newEvent.lightLogo = res.url;
          uploaded = true;
        }
      }
      if (rulebook) {
        uploaded = false;
        const res = await event.upload(rulebook, eid, 'rulebook');
        if (res.code === 'succeed') {
          newEvent.rulebook = res.url;
          uploaded = true;
        }
      }
      if (terms) {
        uploaded = false;
        const res = await event.upload(terms, eid, 'terms');
        if (res.code === 'succeed') {
          newEvent.terms = res.url;
          uploaded = true;
        }
      }
      if (privacy) {
        uploaded = false;
        const res = await event.upload(privacy, eid, 'privacy');
        if (res.code === 'succeed') {
          newEvent.privacy = res.url;
          uploaded = true;
        }
      }

      const res = await event.update(eid, newEvent);
      if (res.code === 'succeed') {
        alert('Saved successfully!');
      }
      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target
      if (type === 'number') value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      })
    },
    setDate: (name, newDate) => {
      setInputs(prev => ({
        ...prev,
        [name]: new Date(newDate)
      }))
    },
    upload: (e, name) => {
      const file = e.target?.files[0];
      const url = URL.createObjectURL(file);
      switch (name) {
        case 'banner':
          setBanner(file);
          setInputs({
            ...inputs,
            banner: url
          })
          break;
        case 'darkLogo':
          setDarkLogo(file);
          setInputs({
            ...inputs,
            darkLogo: url
          })
          break;
        case 'lightLogo':
          setLightLogo(file);
          setInputs({
            ...inputs,
            lightLogo: url
          })
          break;
        case 'rulebook':
          setRulebook(file);
          break;
        case 'terms':
          setTerms(file);
          break;
        case 'privacy':
          setPrivacy(file);
          break;
      }
    },
    removeDarkLogo: (e) => {
      setInputs({
        ...inputs,
        darkLogo: DEFAULT_LOGO
      })
    },
    removeLightLogo: (e) => {
      setInputs({
        ...inputs,
        lightLogo: DEFAULT_LOGO
      })
    }
  }

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <EventInput handle={handle} inputs={inputs} errors={errors} disabled={disabled} />

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <LoadingButton
            loading={saving}
            variant='contained'
            onClick={handle.save}
            disabled={disabled}
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
