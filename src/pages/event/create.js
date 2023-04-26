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
  Paper,
  Select,
  Typography,
  useTheme,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'

import { Edit } from '@mui/icons-material';
import AdminLayout from '@/src/content/AdminLayout'
import { useAppContext } from '@/src/context/app'
import DateTimePicker from '@/src/components/DateTimePicker'
import Validator from 'validatorjs'
import { useTournamentContext } from '@/src/context/TournamentContext'
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';
import EventInput from '@/src/components/event/EventInput';

const initialInputs = {
  logo: DEFAULT_CONTENTBLOCK_IMAGE,
  name: '',
  oid: '',
  category: 0, // league or tournament
  format: 0, // single, double, round robin ...
  seed: 0,  // Manual
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
  participants: [],
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
  const theme = useTheme()
  const router = useRouter()
  const { setTitle } = useAppContext()
  const { organization, event } = useTournamentContext();
  const [oid, setOID] = useState(organization?.current);
  const [saving, setSaving] = useState(false);
  const [rulebook, setRulebook] = useState(null);
  const [terms, setTerms] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [banner, setBanner] = useState(null);
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);

  useEffect(() => {
    setTitle('REGISTER AN EVENT');
    event.setCurrent(null);
  }, [])

  useEffect(() => {
    if (router?.query?.organization) {
      const newOID = router.query.organization;
      organization.setCurrent(newOID);
      setOID(newOID);
      setInputs(prev => ({
        ...prev,
        oid: newOID
      }))
    }
  }, [router])

  useEffect(() => {
    if (event.activeCount[oid] >= 5)
      setDisabled(true)
    else setDisabled(false)
  }, [oid, event.activeCount])

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    setErrors({});
    return true;
  }

  const handle = {
    create: async (e) => {
      if (validate(inputs, rules, customMessages) === false) {
        return;
      }
      let newEvent = { ...inputs }
      setSaving(true)
      const data = await event.create(newEvent);
      if (data.code === 'succeed') {
        let uploaded = true;
        newEvent = {};

        if (banner) {
          uploaded = false;
          const res = await event.upload(banner, data.id, 'banner');
          if (res.code === 'succeed') {
            newEvent.banner = res.url;
            uploaded = true;
          }
        }
        if (darkLogo) {
          uploaded = false;
          const res = await event.upload(darkLogo, data.id, 'darkLogo');
          if (res.code === 'succeed') {
            newEvent.darkLogo = res.url;
            uploaded = true;
          }
        }
        if (lightLogo) {
          uploaded = false;
          const res = await event.upload(lightLogo, data.id, 'lightLogo');
          if (res.code === 'succeed') {
            newEvent.lightLogo = res.url;
            uploaded = true;
          }
        }
        if (rulebook) {
          uploaded = false;
          const res = await event.upload(rulebook, data.id, 'rulebook');
          if (res.code === 'succeed') {
            newEvent.rulebook = res.url;
            uploaded = true;
          }
        }
        if (terms) {
          uploaded = false;
          const res = await event.upload(terms, data.id, 'terms');
          if (res.code === 'succeed') {
            newEvent.terms = res.url;
            uploaded = true;
          }
        }
        if (privacy) {
          uploaded = false;
          const res = await event.upload(privacy, data.id, 'privacy');
          if (res.code === 'succeed') {
            newEvent.privacy = res.url;
            uploaded = true;
          }
        }
        const res = await event.update(data.id, newEvent);
        if (res.code === 'succeed') {
          alert('Saved successfully!');
        }
      } else if (data.code === 'failed') {
        console.error(data.message);
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
            onClick={handle.create}
            disabled={disabled}
          >
            Register
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
